import React from "react";
import styles from "./button.module.css";

export const Component = () => {
  return (
    <>
      <div className={styles.btn_wpr}>
        <div className={styles.btn_wpr_inner}>
          <button className={`${styles.PrimaryColor} ${styles.save_btn}`}>
            Save
          </button>
        </div>
        <div className={styles.btn_wpr_inner}>
          <button className={`${styles.cancel_btn_Color} ${styles.cancel}`}>
          Cancel
          </button>
        </div>

        <div className={styles.btn_wpr_inner}>
          <button className={`${styles.resolved_btn_Color} ${styles.resolved}`}>
          Resolved
          </button>
        </div>

        <div className={styles.btn_wpr_inner}>
          <button className={`${styles.Button_Disabled} ${styles.disable}`}>
          Save
          </button>
        </div>

        <div className={styles.btn_wpr_inner}>
          <button className={`${styles.Disabled_cancel_btn} ${styles.disable_cancel}`}>
          Cancel
          </button>
        </div>

        <div className={styles.btn_wpr_inner}>
          <button className={`${styles.Disabled_resolved_btn} ${styles.disable_resolved}`}>
          Resolved
          </button>
        </div>

      </div>
    </>

    


  );
};
