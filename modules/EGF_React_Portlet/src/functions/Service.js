import axios from 'axios'

const userLang = Liferay.ThemeDisplay.getLanguageId().replace("_","-");

const  baseUrl = location.protocol + '//' + location.hostname;

let tokenObject = {'expiryTime': 0 };

//Prepare Auth params
const getAuthParams = () => {
    const authHeader = 'Bearer ' + tokenObject.access_token;
    return {
        headers: {
            'Authorization': authHeader,
            'Accept-Language': userLang
        }
    };
}

// Execute a generic API function fetching new Auth Token if necessary
const executeFunction = (configuration, functionRef) => {
    let now = new Date();
    if (configuration.clientId && configuration.clientSecret) {
      // Fetch new token if expired
      if (now.getTime() > tokenObject.expiryTime) {
        // Fetch Liferay OAUth2 token - see:
        // https://help.liferay.com/hc/en-us/articles/360018176511-Authorizing-Account-Access-with-OAuth2
        const bodyStr = `client_id=${configuration.clientId}&client_secret=${configuration.clientSecret}&grant_type=client_credentials`;
  
        return axios.post(baseUrl + '/o/oauth2/token', bodyStr, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        })
        .then(response => {
          if (response && response.data) {
            tokenObject = response.data;
            now = new Date();
            // subtract 15 seconds just for luck
            tokenObject.expiryTime = now.getTime() + (tokenObject.expires_in - 15) * 1000;
  
            return functionRef && functionRef(getAuthParams());
          }
          else {
            console.error('Unable to authenticate:', response);
            alert(Liferay.Language.get('auth-error-alert')); // FIXME
          }
        })
      }
      else {
        return functionRef && functionRef(getAuthParams());
      }
    }
    return functionRef && functionRef();
  }
  

  export function getListOfCategories(configuration) {
    const getFunc = (authParams) => {
      //const url = `${baseUrl}/o/c/servicos/scopes/guest`; //TODO
      const url = `https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json`;
      return axios.get(url, authParams);
    };
  
    return executeFunction(configuration, getFunc);
}