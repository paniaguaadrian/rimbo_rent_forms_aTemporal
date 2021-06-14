// React components
import React, { useReducer } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Custom Components
import NavBar from "../../components/NavBar/NavBar";
import CustomHelmet from "../../components/Helmet/CustomHelmet";
import Success from "../../components/Success/Success";
import Footer from "../../components/Footer/Footer";

// Reducer
import { TenantReducer, DefaultTenant } from "./approved_tenant_rimbo-reducer";

// Multi language
import { withNamespaces } from "react-i18next";

// End-Points env
const {
  REACT_APP_BASE_URL,
  REACT_APP_API_RIMBO_TENANCY,
  REACT_APP_BASE_URL_EMAIL,
  REACT_APP_API_RIMBO_TENANT,
} = process.env;

const ApprovedTenantRimbo = ({ t }) => {
  let { tenancyID } = useParams();
  const randomID = tenancyID;
  const [tenant] = useReducer(TenantReducer, DefaultTenant);

  const fetchUserData = () =>
    axios.get(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANCY}/${tenancyID}`
    );

  const postDecision = (body) =>
    axios.post(
      `${REACT_APP_BASE_URL}${REACT_APP_API_RIMBO_TENANT}/${randomID}/approved`,
      body
    );

  const processDecision = async () => {
    const { data: tenancyData } = await fetchUserData();

    const postBody = {
      isRimboAccepted: tenant.isRimboAccepted,
      randomID: tenancyData.tenant.randomID,
    };

    const { tenantsFirstName, tenantsLastName, tenantsEmail, randomID } =
      tenancyData.tenant;
    const {
      agencyName,
      agencyEmailPerson,
      agencyContactPerson,
      agencyPhonePerson,
    } = tenancyData.agent;
    const { building, rentalAddress } = tenancyData.property;
    const { tenancyID, rentStartDate, rentEndDate } = tenancyData;

    if (tenancyData.tenant.isRimboAccepted === false) {
      await axios.post(`${REACT_APP_BASE_URL_EMAIL}/e2tt`, {
        tenantsFirstName,
        tenantsLastName,
        tenantsEmail,
        randomID,
        agencyName,
        agencyEmailPerson,
        agencyContactPerson,
        agencyPhonePerson,
        building,
        rentalAddress,
        tenancyID,
        rentStartDate,
        rentEndDate,
      });
      await postDecision(postBody);
    }
  };

  processDecision();

  return (
    <>
      <CustomHelmet header={t("approvedRimbo.header")} />
      <NavBar />
      <Success
        title={t("approvedRimbo.title")}
        subtitle={t("approvedRimbo.subtitle")}
      />
      <Footer />
    </>
  );
};

export default withNamespaces()(ApprovedTenantRimbo);
