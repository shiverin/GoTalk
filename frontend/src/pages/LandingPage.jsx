import React from "react";
import Layout from "./Layout.jsx";
import Main from "../sections/Main/Main.jsx";

export default function LandingPage({onLoginClick}) {
  return (
    <Layout onLoginClick={onLoginClick}>
      <Main/>
    </Layout>
  );
}

// import React from "react";
// import Header from "../sections/Header/Header.jsx";
// import Body from "../sections/Body/Body.jsx";

// export default function LandingPage() {
//   return (
//     <>
//       <Header/>
//       <Body/>
//     </>
//   );
// }