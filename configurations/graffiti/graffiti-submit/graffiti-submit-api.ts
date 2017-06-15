import { CoSAPI } from "../../cos-api";

export class GraffitiSubmitAPI extends CoSAPI {
    public readonly GRAFFIT_SUBMIT_NEW_SUBMISSION: string = "/graffiti-submit-new-submission";

    public readonly responses = {
        InternalServerError: {
            error: {
                message: "Internal server error occured",
                name: "InternalServerError",
            },
        },
        InvalidParametersError: {
            error: {
                message: "Parameters provided are incorrect",
                name: "InvalidParametersError",
            },
        },
        MaxSubmissionsExceededError: {
            error: {
                message: "You already maxed out your submissions for today",
                name: "MaxSubmissionsExceededError",
            },
        },
    };

    constructor() {
        super();
        this.associatePathsWithMethodsAndParams([
            this.GRAFFIT_SUBMIT_NEW_SUBMISSION,
        ]);
    }
}
