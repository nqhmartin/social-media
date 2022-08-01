import { createAction } from "@reduxjs/toolkit";

export const chooseLanguage = createAction<any>("CHOOSE_LANGUAGE")
export const chooseLanguageSuccess = createAction<any>("CHOOSE_LANGUAGE_SUCCESS")
export const chooseLanguageFailed = createAction<any>("CHOOSE_LANGUAGE_FAILED")
