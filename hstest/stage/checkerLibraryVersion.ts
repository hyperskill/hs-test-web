import packageJson from "../../package.json";

/**
 * CheckerLibraryVersion is a class responsible for comparing the local library
 * version with the remote version available on GitHub.
 *
 * It helps to ensure that the user is using the latest version of the library.
 */
class CheckerLibraryVersion {

    constructor() {}

    /**
     * Compares the local library version with the remote version on GitHub.
     *
     * If the versions are different, an error message will be logged to the console,
     * or an Error will be thrown if the throwError flag is set to true.
     *
     * @param throwError {boolean} - Optional flag to indicate if an Error should be
     *                                thrown when versions are different. Default is false.
     * @returns {Promise<void>} - A promise that resolves when the check is complete.
     */
    async checkLibraryVersion(throwError = false): Promise<void> {

        const libraryVersionUrl = "https://github.com/hyperskill/hs-test-web/blob/master/package.json";
        try {
            const response = await fetch(libraryVersionUrl);
            const packageRemoteJson = await response.json();
            const remoteVersion = packageRemoteJson.version;
            const localVersion = packageJson.version;
            if (remoteVersion !== localVersion) {
                const errorMsg = `The version of the local library (${localVersion}) is different from the version on GitHub (${remoteVersion}). 
                Please update your local version.
                You can download the new version of the library at the link: https://github.com/hyperskill/hs-test-web/archive/release.tar.gz
                To upgrade, install the new version using the command: npm install /path/to/your/archive/hs-test-web-release.tar.gz`;
                if (throwError) {
                    throw new Error(errorMsg);
                } else {
                    console.error(errorMsg);
                }
            }
        } catch (error) {
            console.error("Error while checking library version:\n", error);
            if (throwError) {
                throw error;
            }
        }
    }
}

export default CheckerLibraryVersion;