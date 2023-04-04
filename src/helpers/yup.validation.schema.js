import * as Yup from "yup";
import i18n from "i18next";
import i8 from "../i18n";
i8();

const FILE_SIZE = 2100 * 1500;

export const Password = Yup.string()
  .min(6, i18n.t("PASSWORD_IS_SHORT"))
  .max(50, i18n.t("PASSWORD_IS_LONG"))
  .required(i18n.t("PASSWORD_IS_REQUIRED"));

export const ConfirmPassword = Yup.string()
  .min(6, i18n.t("PASSWORD_IS_SHORT"))
  .max(50, i18n.t("PASSWORD_IS_LONG"))
  .oneOf(
    [Yup.ref("password"), null],
    i18n.t("PASSWORD_AND_CONFIRM_PASSWORD_SHOULD_MATCH")
  )
  .required(i18n.t("CONFIRM_PASSWORD_IS_REQUIRED"));

export const con_password = Yup.string()
  .min(6, i18n.t("PASSWORD_IS_SHORT"))
  .max(50, i18n.t("PASSWORD_IS_LONG"))
  .oneOf(
    [Yup.ref("new_password"), null],
    i18n.t("PASSWORD_AND_CONFIRM_PASSWORD_SHOULD_MATCH")
  )
  .required(i18n.t("CONFIRM_PASSWORD_IS_REQUIRED"));

export const email = Yup.string()
  .email(i18n.t("EMAIL_IS_INVALID"))
  .required(i18n.t("EMAIL_IS_REQUIRED"));

export const name = Yup.string()
  .trim()
  .min(2, i18n.t("NAME_SHOULD_BE_ATLEAST_CONTAIN_TWO"))
  .max(40, i18n.t("NAME_CANNOT_BE_MORE_THAN"))
  .required(i18n.t("NAME_IS_REQUIRED"));

export const multiName = Yup.string()
  .trim()
  .min(2, i18n.t("NAME_SHOULD_BE_ATLEAST_CONTAIN_TWO"))
  .max(40, i18n.t("NAME_CANNOT_BE_MORE_THAN"))
  .required(i18n.t("NAME_IS_REQUIRED"));

export const rewardsMultiName = Yup.string()
  .trim()
  .max(60, i18n.t("REWARD_NAME_CANNOT_BE_MORE_THAN"))
  .required(i18n.t("NAME_IS_REQUIRED"));

export const select_language = Yup.string().required(
  i18n.t("LANGUAGE_IS_REQUIRED")
);

export const titleSchema = (type) => {
  return Yup.object().shape({
    language: select_language,
    title: Yup.lazy((value, context) => {
      const {
        parent: { language },
      } = context;
      if (language) {
        const valueShape = {};
        if (Object.keys(value).length > 0) {
          let isCurrentLangIncluded = false;
          for (const key in value) {
            if (value.hasOwnProperty(key)) {
              const element = value[key];
              if (key === language) {
                isCurrentLangIncluded = true;
                valueShape[key] =
                  type === "rewards" ? rewardsMultiName : multiName;
              } else if (element) {
                valueShape[key] =
                  type === "rewards" ? rewardsMultiName : multiName;
              }
            }
          }
          if (!isCurrentLangIncluded) {
            valueShape[language] =
              type === "rewards" ? rewardsMultiName : multiName;
          }
          return Yup.object().shape(valueShape);
        } else {
          return Yup.object().shape({
            [language]: type === "rewards" ? rewardsMultiName : multiName,
          });
        }
      }
      return Yup.mixed().notRequired();
    }),
  });
};

export const branch_name = Yup.string()
  .min(2, i18n.t("NAME_SHOULD_BE_ATLEAST_CONTAIN_TWO"))
  .max(40, i18n.t("NAME_CANNOT_BE_MORE_THAN"))
  .required(i18n.t("BRANCH_NAME_IS_REQUIRED"));

export const brand_name = Yup.string()
  .min(2, i18n.t("NAME_SHOULD_BE_ATLEAST_CONTAIN_TWO"))
  .max(40, i18n.t("NAME_CANNOT_BE_MORE_THAN"))
  .required(i18n.t("BRAND_NAME_IS_REQUIRED"));

export const permission = Yup.string().required(
  i18n.t("SELECT_PERMISSION_IS_REQUIRED")
);

export const experience = Yup.array()
  .of(Yup.object())
  .required(i18n.t("EXPERIENCE_IS_REQUIRED"))
  .typeError(i18n.t("EXPERIENCE_IS_REQUIRED"));

export const exp_type = Yup.string().required(i18n.t("EXPERIENCE_IS_REQUIRED"));

export const branches_selection = Yup.array()
  .of(Yup.object())
  .required(i18n.t("BRANCHES_IS_REQUIRED"))
  .typeError(i18n.t("BRANCHES_IS_REQUIRED"));

export const brand_selection = Yup.string().required(
  i18n.t("SELECTION_IS_REQUIRED")
);

Yup.addMethod(Yup.array, "unique", function (message) {
  return this.test("unique", message, function (list) {
    const mapper = (x) => x.email;
    const set = [...new Set(list.map(mapper))];
    const isUnique = list.length === set.length;
    if (isUnique) {
      return true;
    }
    const idx = list.findIndex((l, i) => mapper(l) !== set[i]);
    return this.createError({
      path: `[${idx}].email`,
      message: "Email must be unique",
    });
  });
});

export const userCrudSchema = Yup.object().shape({
  users: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string()
          .required(i18n.t("THIS_FIELD_S_REQUIRED"))
          .min(2, i18n.t("NAME_SHOULD_BE_ATLEAST_CONTAIN_TWO"))
          .max(40, i18n.t("NAME_CANNOT_BE_MORE_THAN")),
        email: Yup.string()
          .required(i18n.t("THIS_FIELD_S_REQUIRED"))
          .email(i18n.t("EMAIL_IS_INVALID")),
        permission: Yup.string().required(
          i18n.t("SELECT_PERMISSION_IS_REQUIRED")
        ),
      })
    )
    .unique("Must be unique"),
});

export const valid_from = Yup.string().required(
  i18n.t("VALIDITY_PERIOD_IS_REQUIRED")
);

const PHONE_NO_REGEX = /^[0-9\- ]{10,11}$/;

export const phone_number = Yup.string()
  .matches(PHONE_NO_REGEX, {
    message: i18n.t("NOT_VALID_PHONE_NUMBER"),
    excludeEmptyString: true,
  })
  .max(12, i18n.t("PHONE_NUMBER_SHOULD_BE_LESS_THAN_11_DIGIT"))
  .required(i18n.t("PHONE_NUMBER_IS_REQUIRED"));

export const brand_logo = Yup.mixed()
  .notRequired()
  .test(
    "fileSize",
    i18n.t("FILE_TOO_LARGE"),
    (value) => !value || (value && value[0].size <= FILE_SIZE)
  );

export const min = Yup.number()
  .nullable()
  .required(i18n.t("RATING_FIELD_REQUIRED"));

export const max = Yup.number()
  .nullable()
  .required(i18n.t("RATING_FIELD_REQUIRED"))
  .test(
    "superior",
    i18n.t("MIN_RATING_MUST_BE_SMALLER_THAN_MAX_RATING"),
    function (f) {
      const ref = Yup.ref("min");
      return f > this.resolve(ref);
    }
  );

export const validity = Yup.number().required(
  i18n.t("VALIDITY_DAYS_ARE_REQUIRED")
);

export const ratings1 = Yup.number();
export const ratings2 = Yup.number().moreThan(Yup.ref("ratings1"));

export const price1 = Yup.number();
export const price2 = Yup.number().moreThan(Yup.ref("price1"));

export const last_ratings1 = Yup.number();
export const last_ratings2 = Yup.number().moreThan(Yup.ref("last_ratings1"));

export const feedback1 = Yup.number();
export const feedback2 = Yup.number().moreThan(Yup.ref("feedback1"));

export const experience_type1 = Yup.number();
export const experience_type2 = Yup.number().moreThan(Yup.ref("experience_type1"));

export const brands1 = Yup.number();
export const brands2 = Yup.number().moreThan(Yup.ref("brands1"));

export const profile_pic = Yup.mixed()
  .required(i18n.t("A_FILE_IS_REQUIRED"))
  .test(
    "fileSize",
    i18n.t("FILE_TOO_LARGE"),
    (value) => value && value[0] && value[0].size <= FILE_SIZE
  );

export const currency = Yup.string().required(
  i18n.t("CURRENCY_SELECTION_IS_REQUIRED")
);

export const languages = Yup.array().of(Yup.string());

export const staffMemberSchema = Yup.object().shape({
  language: select_language,
  name: Yup.lazy((value, context) => {
    const {
      parent: { language },
    } = context;
    if (language) {
      const valueShape = {};
      if (Object.keys(value).length > 0) {
        let isCurrentLangIncluded = false;
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            const element = value[key];
            if (key === language) {
              isCurrentLangIncluded = true;
              valueShape[key] = multiName;
            } else if (element) {
              valueShape[key] = multiName;
            }
          }
        }
        if (!isCurrentLangIncluded) {
          valueShape[language] = multiName;
        }
        return Yup.object().shape(valueShape);
      } else {
        return Yup.object().shape({
          [language]: multiName,
        });
      }
    }
    return Yup.mixed().notRequired();
  }),
  experience_type: experience,
  branches: branches_selection,
});

export const productSchema = Yup.object().shape({
  language: select_language,
  name: Yup.lazy((value, context) => {
    const {
      parent: { language },
    } = context;
    if (language) {
      const valueShape = {};
      if (Object.keys(value).length > 0) {
        let isCurrentLangIncluded = false;
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            const element = value[key];
            if (key === language) {
              isCurrentLangIncluded = true;
              valueShape[key] = multiName;
            } else if (element) {
              valueShape[key] = multiName;
            }
          }
        }
        if (!isCurrentLangIncluded) {
          valueShape[language] = multiName;
        }
        return Yup.object().shape(valueShape);
      } else {
        return Yup.object().shape({
          [language]: multiName,
        });
      }
    }
    return Yup.mixed().notRequired();
  }),
  experience_type_id: experience,
  branch_id: branches_selection,
  price: Yup.string()
    .required(i18n.t("PRICE_IS_REQUIRED"))
    .matches(/^[0-9]+$/, i18n.t("ONLY_NUMBERS_ARE_ALLOWED")),
  logo: brand_logo,
  category_id: Yup.string().required(i18n.t("CATEGORY_IS_REQUIRED")),
});

export const termSchema = Yup.object().shape({
  language: select_language,
  terms_and_condition: Yup.lazy((value, context) => {
    const {
      parent: { language },
    } = context;
    if (language) {
      const valueShape = {};
      const _value = value[0];
      if (Object.keys(_value).length > 0) {
        let isCurrentLangIncluded = false;
        for (const key in _value) {
          if (_value.hasOwnProperty(key)) {
            const element = _value[key];
            if (key === language) {
              isCurrentLangIncluded = true;
              valueShape[key] = multiName;
            } else if (element) {
              valueShape[key] = multiName;
            }
          }
        }
        if (!isCurrentLangIncluded) {
          valueShape[language] = multiName;
        }
        return Yup.array().of(Yup.object().shape(valueShape));
      } else {
        return Yup.array().of(
          Yup.object().shape({
            [language]: multiName,
          })
        );
      }
    }
    return Yup.mixed().notRequired();
  }),
});

export const questionSchema = Yup.object().shape({
  language: select_language,
  name: Yup.lazy((value, context) => {
    const {
      parent: { language },
    } = context;
    if (language) {
      const valueShape = {};
      if (Object.keys(value).length > 0) {
        let isCurrentLangIncluded = false;
        for (const key in value) {
          if (value.hasOwnProperty(key)) {
            const element = value[key];
            if (key === language) {
              isCurrentLangIncluded = true;
              valueShape[key] = multiName;
            } else if (element) {
              valueShape[key] = multiName;
            }
          }
        }
        if (!isCurrentLangIncluded) {
          valueShape[language] = multiName;
        }
        return Yup.object().shape(valueShape);
      } else {
        return Yup.object().shape({
          [language]: multiName,
        });
      }
    }
    return Yup.mixed().notRequired();
  }),
  type: Yup.string().required("Type is required"),
  options: Yup.lazy((value, context) => {
    const {
      parent: { type },
    } = context;
    if (type === "multiple") {
      return Yup.array().of(
        Yup.string()
          .required(i18n.t("THIS_FIELD_S_REQUIRED"))
          .min(2, i18n.t("OPTION_SHOULD_ATLEAST_CONTAIN_2_CHARACTERS"))
          .max(40, i18n.t("OPTION_CAN_NOT_BE_MORE_THAN_20_CHARACTER"))
      );
    }
    return Yup.mixed().notRequired();
  }),
});
