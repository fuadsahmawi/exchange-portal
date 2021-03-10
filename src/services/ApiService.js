import axios from 'axios';
import { config } from '../config/Config';

export default class ApiService {
    async login(payload) {
        return axios.post(config.baseUrl+'login', payload, {
            headers: {
                'x-api-key': config.apiKey
            }
        })
        .then(function(response) {
            console.log(response);
            return response;               
        })
        .catch(function(error) {
            console.log(error)
            return null;
        });
    }

    async queryCurrentPricing(payload) {
        return axios.post(config.baseUrl+'pricing/current', payload, {
            headers: {
                'x-api-key': config.apiKey
            }
        })
        .then(function(response) {
            console.log(response);
            return response;               
        })
        .catch(function(error) {
            console.log(error)
            return null;
        });
    }

    async queryBalance(payload) {
        return axios.post(config.baseUrl+'balance', payload, {
            headers: {
                'x-api-key': config.apiKey
            }
        })
        .then(function(response) {
            console.log(response);
            return response;               
        })
        .catch(function(error) {
            console.log(error)
            return null;
        });
    }
}