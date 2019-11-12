import Axios from 'axios';
import { RestUrls } from './Urls';

export class RestDataSource {
  GetData = async(dataType, params) => {
    //console.log("url: ", RestUrls[dataType])
    return this.SendRequest("get", RestUrls[dataType], params);
  };
  SendRequest = (method, url, params) => Axios.request({method, url, params});
}