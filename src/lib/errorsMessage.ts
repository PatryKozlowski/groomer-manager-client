const errorMessages: { [key: string]: string } = {
  InvalidPhoneNumberFormat: "Podaj poprawny numer telefonu",
  InvalidEmailOrPassword: "Niepoprawny email lub hasło",
  ClientAlreadyExist: "Klient juz istnieje",
  Unauthorized: "Brak dostępu",
};

export function getErrorMessage(errorCode: string): string {
  return errorMessages[errorCode];
}
