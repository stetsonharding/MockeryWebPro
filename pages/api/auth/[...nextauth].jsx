// import CredentialsProvider from "next-auth/providers/credentials";
// import NextAuth from "next-auth";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "@app/firebase";

// //API url - Should this url be hidden in .env file?
// //Change paramerters based on environment we are deploying too
// const url = "http://localhost:1886/mockery/userprofiles";

// // //Check if user has a profile in Mockery Service
// // const checkMockeryUserProfile = async (userToken) => {
// //   //Headers
// //   const options = {
// //     method: "GET",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${userToken}`, // users token
// //     },
// //   };
// //   try {
// //     //Fetch profile in Mockery and pass headers - return the response
// //     let promise = await fetch(url, options);
// //     if (promise.ok) {
// //       let response = await promise.json();
// //       return response;
// //     }
// //   } catch (error) {
// //     //Request failed
// //     console.log(error.message);
// //   }
// // };

// //Create a user profile in Mockery with users JWT
// // const createMockeryServiceProfile = async (userToken) => {
// //   //Headers for post rquest.
// //   const options = {
// //     method: "POST",
// //     headers: {
// //       "Content-Type": "application/json",
// //       Authorization: `Bearer ${userToken}`, // users token
// //     },
// //   };
// //   //Post to API and log the status
// //   let promise = await fetch(url, options);
// //   console.log(promise.status); //status 201
// // };

// export const authOptions = {
//   // When the user tries to sign in, route to the signin page
//   pages: {
//     signIn: "/signin",
//   },
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {},
//       async authorize(credentials) {
//         try {
//           // Sign in user w/ Firebase
//           const userCredential = await signInWithEmailAndPassword(
//             auth,
//             credentials.email,
//             credentials.password
//           );
//           // Getting user token
//           const idToken = await userCredential.user.getIdToken(
//             /* forceRefresh */ true
//           );

//           //Checking to see if user has a profile
//           let doesUserHaveProfile = await checkMockeryUserProfile(idToken);
//           if (doesUserHaveProfile) {
//             //user has profile
//             console.log("User has a profile");
//           } else {
//             //No user profile
//             console.log("ERROR, NO USER PROFILE");
//             //Calling function to create user profile in Mockery Service passing users JWT
//             createMockeryServiceProfile(idToken);
//           }

//           // Return user info
//           return Promise.resolve({ ...userCredential.user });
//         } catch (error) {
//           // Handle sign-in error
//           console.error(error);
//           throw new Error("Authentication failed");
//         }
//       },
//     }),
//   ],
// };

// export default NextAuth(authOptions);

import NextAuth from "next-auth";
import AzureADB2CProvider from "next-auth/providers/azure-ad-b2c";

//Check if user has a profile in Mockery Service
const checkMockeryUserProfile = async (userToken) => {
  const checkMockeryAccountURL = `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/userprofiles`;

  //Headers
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`, // users token
    },
  };
  try {
    //Fetch profile in Mockery and pass headers
    let promise = await fetch(checkMockeryAccountURL, options);
    if (promise.ok) {
      let response = await promise.json();
      return response;
    }
  } catch (error) {
    //Request failed
    console.log(error.message);
  }
};

//Create mockery account
const createMockeryServiceProfile = async (userToken) => {
  const createMockeryAccountURL = `${process.env.NEXT_PUBLIC_MOCKERY_BASEURL}/api/userprofiles`;
  //Headers
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userToken}`, // users token
    },
  };

  try {
    //api call
    let promise = await fetch(createMockeryAccountURL, options);
    if (promise.ok) {
      console.log("created profile");
      let response = await promise.json();
      return response;
    }
  } catch (error) {
    //Request failed
    console.log(error.message);
  }
};

export const authOptions = {
  providers: [
    AzureADB2CProvider({
      tenantId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_TENANT_NAME,
      clientId: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_SECRET,
      primaryUserFlow: process.env.NEXT_PUBLIC_AZURE_AD_B2C_PRIMARY_USER_FLOW,

      authorization: {
        params: {
          scope:
            "https://dassystemsolutions.onmicrosoft.com/b3d812fd-57bb-45fb-b1a7-c8d43a7457a2/access_as_user offline_access openid",
        },
      },

      httpOptions: { timeout: 10000 },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_AZURE_AD_B2C_CLIENT_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account?.expires_at
            ? account.expires_at * 1000
            : 0,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires - 100000 || 0) {
        return token;
      }
    },
    async session({ session, token }) {
   
      // Check and create a profile in the Mockery Service
      try {
        const doesUserHaveProfile = await checkMockeryUserProfile(
          token.accessToken
        );

        console.log(doesUserHaveProfile)

        if (doesUserHaveProfile) {
          // User has a profile
          console.log("Profile already created");
        } else {
          // No user profile, create one
          console.log("Creating profile");
          await createMockeryServiceProfile(token.accessToken);
        }
      } catch (error) {
        console.error("Error checking/creating profile:", error);
      }

      if (session) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
};

export default NextAuth(authOptions);
