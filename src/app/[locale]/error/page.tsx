import { getMessages } from "next-intl/server";

type Params = {
  params: {
    locale: string;
  };
};

const ErrorPage = async ({ params }: Params) => {
  const messages = (await getMessages({ locale: params.locale })) as Record<
    string,
    string
  >;
  return (
    <div style={{ textAlign: "center" }}>
      <h1>{messages["issueFetchingData"]}</h1>
      <h1 style={{ marginTop: "40px" }}>{messages["tryAgainLater"]}</h1>
    </div>
  );
};

export default ErrorPage;
