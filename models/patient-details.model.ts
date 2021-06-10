export class PatientDetails {
    focus = new focus();
    location = new location();
    patient = new patient();
    Pharmacist = new Pharmacist();
    //MedicationOrder: Array<MedicationOrder> = [new MedicationOrder()];
    MedicationOrder = new MedicationOrder();
}
export class focus {
    identifier: string = null;
}
export class location {
    system: string = null;
    NCPDP: number = null;
}
export class patient {
    id:string=null;
    name = new Name();
    //telecom: Array<telecom> = [new telecom(), new telecom(), new telecom()];
    telecom: Array<telecom> = [new telecom()];
    address = new Address();
    birthdate: string = null;
}
export class telecom {
    system: string = null;
    use: string = null;
    value: string = null;
}
export class Name {
    given = new Array();
    family: string = null;
    prefix: string = null;
    suffix: string = null;
    text: string = null;
}
export class Address {
    line = new Array();
    city: string = null;
    state: string = null;
    postalCode: string = null;
}
export class Pharmacist {
    name = new name();
}
export class name {
    given = new Array();
    family: string = null;
    prefix: string = null;
    suffix: string = null;
}
export class MedicationOrder {
    manifestId: string = null;
    totalSyncedRX =1;
    dateNeedBy: string = null;

    lines: Array<lines> = [new lines()];

    // MedicationRequest = new MedicationRequest();
    // MedicationDispense = new MedicationDispense();
}
export class lines{
    authorizingPrescription = new authorizingPrescription();
    MedicationRequest = new MedicationRequest();
    MedicationDispense = new MedicationDispense();

}
export class MedicationRequest {
    authorOn: string = null;
    Requestor = new Requestor();
    validityPeriod = new validityPeriod();
    medicationCodeableConcept: Array<medicationCodeableConcept> = [new medicationCodeableConcept()];
}
export class Requestor {
    name = new Name();
    address = new Address();
    telecom: Array<telecom> = [new telecom()];
}
export class validityPeriod {
    end: string = null;
}
export class medicationCodeableConcept {
    system: string = null;
    code: string = null;
}
export class MedicationDispense {
    dispenseLineid: string = null;
    originalFillDate: string = null;
    dispenseStartDate: string = null;
    dispenseRefillNumber: number = null;
    refillsRemaining: number = null;
    refillMessage: string = null;
    orderType: string = null;
    RXSyncSeq: number = null;

    //authorizingPrescription = new authorizingPrescription();
    medicationCodeableConcept: Array<medicationCodeableConcept> = [new medicationCodeableConcept()];
    substitution = new substitution();
    daysSupply: number = null;
    quantity: number = null;

    sig: string = null;
    warning = new Array();
    //extension = new extension();
    dosageInstruction: Array<dosageInstruction> = [];
}

export class authorizingPrescription {
    value: string = null;
}
export class substitution {
    wasSubstituted: boolean = false;
}
// export class extension {
//     dateNeedBy: string = null;
//     originalFillDate: string = null;
//     dispenseStartDate: string = null;
//     dispenseRefillNumber: string = null;
//     refillsRemaining: string = null;
//     refillMessage: string = null;
//     manifestId: string = null;
//     orderType: string = null;
//     totalSyncedRX: string = null;
//     RXSyncSeq: string = null;
// }
export class dosageInstruction {
    //text: string = null;
    asNeededBoolean: boolean = false;
    doseQuantity = new doseQuantity();
    //additionalInstruction: Array<additionalInstruction> = [new additionalInstruction()];
    timing: Array<timing> = [new timing()];
}
export class additionalInstruction {
    text: string = null;
}
export class doseQuantity {
    unit: string = null;
    value: number = null;
}
export class timing{
    count: number = null;
    frequency: number = null;
    period: number = null;
    periodUnit: string = null;
    timeOfDay = new Array();
}
