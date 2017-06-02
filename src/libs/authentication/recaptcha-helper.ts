import { request } from "https";
import { stringify } from "query-string";
import { CoSServerConstants } from "./../../cos-server-constants";

/**
 * Basic helper class for dealing with reCaptcha payloads.
 */
export class ReCaptchaHelper {
    /**
     * Verifies payload includes a correct reCaptcha response.
     *
     * @param recaptchaResponse - Response from reCaptcha server.
     *
     * @return - Void resolving promise
     */
    public static verifyRecaptchaSuccess(recaptchaResponse: string): Promise<void> {
        let responseData = "";
        const requestParams = stringify({
            response: recaptchaResponse,
            secret: process.env.RECAPTCHA_SECRET,
        });

        const options = {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            host: this.RECAPTCHA_VERIFY_URL,
            method: "POST",
            path: this.RECAPTCHA_VERIFY_PATH + "?" + requestParams,
            port: 443,
        };

        return new Promise((resolve, reject) => {

            const reCaptchaRequest = request(options, (response) => {
                response.on("data", (chunk) => {
                    responseData += chunk;
                });

                response.on("end", () => {
                    const responseJson = JSON.parse(responseData);
                    if (responseJson.success) {
                        resolve();
                    }
                console.log("ff");
                    reject(CoSServerConstants.RECAPTCHA_RESPONSE_FAILURE);
                });
            });

            reCaptchaRequest.on("error", (error) => {
                console.log("gg");
                reject(CoSServerConstants.HTTP_SEND_ERROR);
            });

            reCaptchaRequest.end();

        }).then(() => {
            return;
        });

    }

    private static readonly RECAPTCHA_VERIFY_URL: string = "www.google.com";
    private static readonly RECAPTCHA_VERIFY_PATH: string = "/recaptcha/api/siteverify";

}
