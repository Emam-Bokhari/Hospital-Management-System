import { generateDynamicId } from "../../utils/modelSpecific/generateDynamicId"
import { DeathRecord } from "./deathRecord.model";

// generate death certificate no
export const generateDeathCertificateNo = async () => {
    const deathCertificateNo = await generateDynamicId(DeathRecord, "DTH", "deathCertificateNo");
    return deathCertificateNo;
}