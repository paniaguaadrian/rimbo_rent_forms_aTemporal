// React Components
import React, { useState } from "react";
import PropTypes from "prop-types";

// Custom Components
import Input from "../../components/Input";
import Button from "../../components/Button";

// Validation
import { isAgency } from "./validation";

// Constants
import { UPDATE_TENANCY_INFO } from "./constants";

// Styles imported
import styles from "./register-user.module.scss";

// Multilanguage
import { withNamespaces } from "react-i18next";

const AgencyDetails = ({ step, setStep, tenancy, setTenancy, t }) => {
  const [errors, setErrors] = useState({});

  // Handle on change
  const handleAgency = ({ target }) => {
    setTenancy({
      type: UPDATE_TENANCY_INFO,
      payload: { [target.name]: target.value },
    });
  };

  // Hanlde con next / continue
  const handleContinue = (e) => {
    e.preventDefault();
    const errors = isAgency(tenancy);
    setErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setStep(step + 1);
  };

  return (
    <form onSubmit={handleContinue}>
      <div className={styles.FormIntern}>
        <div className={styles.GroupInput}>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="agencyContactPerson"
              value={tenancy.agencyContactPerson}
              label={t("F1SC.stepZero.agencyContactPerson")}
              placeholder={t("F1SC.stepZero.agencyContactPersonPL")}
              onChange={(e) => handleAgency(e)}
              error={errors.agencyContactPerson}
            />
          </div>
          <div className={styles.FormLeft}>
            <Input
              type="email"
              name="agencyEmailPerson"
              value={tenancy.agencyEmailPerson}
              label={t("F1SC.stepZero.agencyEmailPerson")}
              placeholder={t("F1SC.stepZero.agencyEmailPersonPL")}
              onChange={(e) => handleAgency(e)}
              error={errors.agencyEmailPerson}
            />
          </div>
        </div>

        <div className={styles.GroupInputAlone}>
          <div className={styles.FormLeft}>
            <Input
              type="text"
              name="agencyPhonePerson"
              value={tenancy.agencyPhonePerson}
              label={t("F1SC.stepZero.agencyPhonePerson")}
              placeholder={t("F1SC.stepZero.agencyPhonePersonPL")}
              onChange={(e) => handleAgency(e)}
              error={errors.agencyPhonePerson}
            />
          </div>
        </div>
      </div>

      <div className={styles.AloneButtonContainer}>
        <Button type="submit">{t("nextStepButton")}</Button>
      </div>
    </form>
  );
};

AgencyDetails.propTypes = {
  step: PropTypes.number,
  setStep: PropTypes.func,
  tenancy: PropTypes.object,
  setTenancy: PropTypes.func,
};

export default withNamespaces()(AgencyDetails);
