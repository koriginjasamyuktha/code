import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms'
import { NgxSpinnerService } from 'ngx-spinner';
import { MasterServicesService } from '../../../../../services/master-services.service';
import { PatientDetails, MedicationRequest, MedicationDispense, dosageInstruction, timing } from '../../../../../models/patient-details.model';

@Component({
  selector: 'app-accounts-users-create',
  templateUrl: './accounts-users-create.component.html',
  styleUrls: [],
  preserveWhitespaces: true,
  providers: [MasterServicesService, NgxSpinnerService]
})
export class AccountsUsersCreateComponent implements OnInit {
  token = {} as any;
  PatientDetailsForm = new PatientDetails();
  MedicationRequest = new MedicationRequest();
  MedicationDispense = new MedicationDispense();
  SubmitForm: FormGroup;
  constructor(private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private _APIMasters: MasterServicesService) {
    this.initiateSubmitForm();
  }
  ngOnInit(): void {
    // this._APIMasters.tokenService().subscribe(data => { this.token=data; });
    this.addDosageDetails();
  }
  initiateSubmitForm() {
    this.SubmitForm = this._formBuilder.group({
      identifier: ['af7816a4-3b87-41c4-91d5-f4f7a0369099'],
      NCPDP: ['4583337'],
      system: ['BestRx'],
      id:['ID00001'],
      first_name: ['Jane'],
      middle_name: [''],
      last_name: ['Jackson'],
      prefix: [null],
      suffix: [null],
      dob: ['1982-12-04'],
      home_system: ['phone'],
      home_use: ['home'],
      home_number: ['(313)123-1235'],
      // work_system: [''],
      // work_use: [''],
      // work_number: [null],
      // mobile_system: [''],
      // mobile_use: [''],
      // mobile_number: [null],
      line_1: ['123 Main Street'],
      line_2: ['Apt E'],
      city: ['Delaware'],
      state: ['DE'],
      postalCode: ['96079'],
      pharmacist_first_name: ['Robin'],
      pharmacist_middle_name: [''],
      pharmacist_last_name: ['Brown'],
      pharmacist_prefix: [''],
      pharmacist_suffix: [''],
      authorOn: ['2020-12-06T13:23:30Z'],
      validityPeriodEnd: ['2021-12-06T13:23:30Z'],
      requestor_medication_system: ['http://hl7.org/fhir/sid/ndc'],
      requestor_medication_code: ['67877-0321-05'],
      requestor_home_number: ['(313)309-4225'],
      requestor_home_use: ['work'],
      requestor_home_system: ['phone'],
      requestor_postalCode: ['19713'],
      requestor_state: ['DE'],
      requestor_city: ['Newark'],
      requestor_line_2: [''],
      requestor_line_1: ['15 Central Ave Suite B'],
      requestor_dob: [''],
      requestor_last_name: ['Malone'],
      requestor_middle_name: [''],
      requestor_first_name: ['Mary'],
      requestor_suffix: [''],
      requestor_prefix: ['Dr.'],
      medication_dispense_daysSupply: [30],
      medication_dispense_quantity: [90],
      medication_dispense_authorizingPrescription: ['202105241557'],
      medication_dispense_substitution: [false],
      medication_dispense_sig: ['TAKE 1 PILL IN THE MORNING, 2 PILLS AT NIGHT'],
      medication_dispense_warning: ['WARNING1'],
      medication_dispense_dateNeedBy: ['2021-06-15T13:23:00Z'],
      medication_dispense_originalFillDate: ['2020-08-01T12:23:00Z'],
      medication_dispense_dispenseStartDate: ['2021-03-11T00:00:00Z'],
      medication_dispense_dispenseRefillNumber: [4],
      medication_dispense_refillsRemaining: [3],
      medication_dispense_refillMessage: [''],
      medication_dispense_manifestId: ['9901'],
      medication_dispense_orderType: ['ATP'],
      medication_dispense_totalSyncedRX: 1,
      medication_dispense_RXSyncSeq: [1],
      medication_dispense_medication_system: ['http://hl7.org/fhir/sid/ndc'],
      medication_dispense_medication_code: ['67877-0321-05'],
      medication_dispense_dispenseLineid: ['ABC999'],

      dosageDetails: this._formBuilder.array([]),
    });
  }
  //Dosage Details Form Starts Here
  get dosageDetails(): FormArray { return this.SubmitForm.get("dosageDetails") as FormArray }
  newDosageDetails(): FormGroup {
    return this._formBuilder.group({
      dosage_instructions_asNeededBoolean: 'false',
      dosage_instructions_dose_quantity_value: '1',
      dosage_instructions_dose_quantity_unit: 'TAB',
      dosage_instructions_timing_frequency: '1',
      dosage_instructions_timing_period: '1',
      dosage_instructions_timing_periodUnit: 'd',
      dosage_instructions_timing_count: '30',
      dosage_instructions_timing_timeOfDay_1: '08:00',
      dosage_instructions_timing__timeOfDay_2: ''
    })
  }
  addDosageDetails() { this.dosageDetails.push(this.newDosageDetails()); }
  removeDosageDetails(i: number) { this.dosageDetails.removeAt(i); }
  //Dosage Details Form Ends Here

  submitForm() {
    const requestObj = this.SubmitForm.value;
    this.PatientDetailsForm.focus.identifier = requestObj.identifier;
    this.PatientDetailsForm.location.system = requestObj.system;
    this.PatientDetailsForm.location.NCPDP = requestObj.NCPDP;

    this.PatientDetailsForm.patient.id = requestObj.id;
    this.PatientDetailsForm.patient.name.family = requestObj.last_name;
    this.PatientDetailsForm.patient.name.prefix = requestObj.prefix;
    this.PatientDetailsForm.patient.name.suffix = requestObj.suffix;
    this.PatientDetailsForm.patient.name.text = requestObj.first_name + ' ' + requestObj.middle_name + ' ' + requestObj.last_name;
    this.PatientDetailsForm.patient.name.given.push(requestObj.first_name);
    requestObj.middle_name ? this.PatientDetailsForm.patient.name.given.push(requestObj.middle_name) : '';

    this.PatientDetailsForm.patient.birthdate = requestObj.dob;

    this.PatientDetailsForm.patient.address.city = requestObj.city;
    this.PatientDetailsForm.patient.address.state = requestObj.state;
    this.PatientDetailsForm.patient.address.postalCode = requestObj.postalCode;
    this.PatientDetailsForm.patient.address.line.push(requestObj.line_1);
    this.PatientDetailsForm.patient.address.line.push(requestObj.line_2);

    this.PatientDetailsForm.patient.telecom[0] = { "system": requestObj.home_system, "use": requestObj.home_use, "value": requestObj.home_number };
    // this.PatientDetailsForm.patient.telecom[1] = { "system": requestObj.work_system, "use": requestObj.work_use, "value": requestObj.work_number };
    // this.PatientDetailsForm.patient.telecom[2] = { "system": requestObj.mobile_system, "use": requestObj.mobile_use, "value": requestObj.mobile_number };

    this.PatientDetailsForm.Pharmacist.name.family = requestObj.pharmacist_last_name;
    this.PatientDetailsForm.Pharmacist.name.prefix = requestObj.pharmacist_prefix;
    this.PatientDetailsForm.Pharmacist.name.suffix = requestObj.pharmacist_suffix;
    this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_first_name);

    requestObj.pharmacist_middle_name ? this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_middle_name) : '';
    //this.PatientDetailsForm.Pharmacist.name.given.push(requestObj.pharmacist_middle_name);


    this.MedicationRequest.authorOn = requestObj.authorOn;
    this.MedicationRequest.validityPeriod.end = requestObj.validityPeriodEnd;
    this.MedicationRequest.medicationCodeableConcept[0].code = requestObj.requestor_medication_code;
    this.MedicationRequest.medicationCodeableConcept[0].system = requestObj.requestor_medication_system;

    this.MedicationRequest.Requestor.name.family = requestObj.requestor_last_name;
    this.MedicationRequest.Requestor.name.prefix = requestObj.requestor_prefix;
    this.MedicationRequest.Requestor.name.suffix = requestObj.requestor_suffix;
    this.MedicationRequest.Requestor.name.text = requestObj.requestor_first_name + ' ' + requestObj.requestor_middle_name + ' ' + requestObj.requestor_last_name;
    this.MedicationRequest.Requestor.name.given.push(requestObj.requestor_first_name);
    requestObj.requestor_middle_name ? this.MedicationRequest.Requestor.name.given.push(requestObj.requestor_middle_name) : '';
    //this.MedicationRequest.Requestor.name.given.push(requestObj.requestor_middle_name);

    this.MedicationRequest.Requestor.address.city = requestObj.requestor_city;
    this.MedicationRequest.Requestor.address.postalCode = requestObj.requestor_postalCode;
    this.MedicationRequest.Requestor.address.state = requestObj.requestor_state;
    this.MedicationRequest.Requestor.address.line.push(requestObj.requestor_line_1);
    this.MedicationRequest.Requestor.address.line.push(requestObj.requestor_line_2);
    this.MedicationRequest.Requestor.telecom[0] = { "system": requestObj.requestor_home_system, "use": requestObj.requestor_home_use, "value": requestObj.requestor_home_number };


    this.MedicationDispense.daysSupply = requestObj.medication_dispense_daysSupply;
    this.MedicationDispense.quantity = requestObj.medication_dispense_quantity;
    this.MedicationDispense.sig = requestObj.medication_dispense_sig;
    this.MedicationDispense.warning = requestObj.medication_dispense_warning;

    //this.MedicationDispense.authorizingPrescription.value = requestObj.medication_dispense_authorizingPrescription;
    this.MedicationDispense.substitution.wasSubstituted = requestObj.medication_dispense_substitution;

    //this.MedicationDispense.extension.dateNeedBy = requestObj.medication_dispense_dateNeedBy;

    this.MedicationDispense.dispenseLineid = requestObj.medication_dispense_dispenseLineid;
    this.MedicationDispense.originalFillDate = requestObj.medication_dispense_originalFillDate;
    this.MedicationDispense.dispenseStartDate = requestObj.medication_dispense_dispenseStartDate;
    this.MedicationDispense.dispenseRefillNumber = requestObj.medication_dispense_dispenseRefillNumber;
    this.MedicationDispense.refillsRemaining = requestObj.medication_dispense_refillsRemaining;
    this.MedicationDispense.refillMessage = requestObj.medication_dispense_refillMessage;
    //this.MedicationDispense.extension.manifestId = requestObj.medication_dispense_manifestId;
    this.MedicationDispense.orderType = requestObj.medication_dispense_orderType;
    //this.MedicationDispense.extension.totalSyncedRX = requestObj.medication_dispense_totalSyncedRX;
    this.MedicationDispense.RXSyncSeq = requestObj.medication_dispense_RXSyncSeq;

    this.MedicationDispense.medicationCodeableConcept[0].system = requestObj.medication_dispense_medication_system;
    this.MedicationDispense.medicationCodeableConcept[0].code = requestObj.medication_dispense_medication_code;

    this.PatientDetailsForm.MedicationOrder.manifestId = requestObj.medication_dispense_manifestId;
    this.PatientDetailsForm.MedicationOrder.totalSyncedRX = requestObj.medication_dispense_totalSyncedRX;
    this.PatientDetailsForm.MedicationOrder.dateNeedBy = requestObj.medication_dispense_dateNeedBy;

    this.PatientDetailsForm.MedicationOrder.lines[0].authorizingPrescription.value = requestObj.medication_dispense_authorizingPrescription;
    this.PatientDetailsForm.MedicationOrder.lines[0].MedicationRequest = this.MedicationRequest;
    this.PatientDetailsForm.MedicationOrder.lines[0].MedicationDispense = this.MedicationDispense;

    requestObj.dosageDetails.forEach(dosageDetail => {
      let timingData = new timing();
      timingData.count = dosageDetail.dosage_instructions_timing_count;
      timingData.frequency = dosageDetail.dosage_instructions_timing_frequency;
      timingData.period = dosageDetail.dosage_instructions_timing_period;
      timingData.periodUnit = dosageDetail.dosage_instructions_timing_periodUnit;
      timingData.timeOfDay.push(dosageDetail.dosage_instructions_timing_timeOfDay_1)
      timingData.timeOfDay.push(dosageDetail.dosage_instructions_timing_timeOfDay_2)
      let dosageData = new dosageInstruction();
      dosageData.asNeededBoolean = dosageDetail.dosage_instructions_asNeededBoolean;
      dosageData.doseQuantity.unit = dosageDetail.dosage_instructions_dose_quantity_unit;
      dosageData.doseQuantity.value = dosageDetail.dosage_instructions_dose_quantity_value;
      dosageData.timing.push(timingData);
      this.PatientDetailsForm.MedicationOrder.lines[0].MedicationDispense.dosageInstruction.push(dosageData);
    });
    this._APIMasters.postPatient(this.PatientDetailsForm, this.token).subscribe(data => { }, error => { this.LoadingScreen(false); });
  }
  LoadingScreen(e: any) { if (e) { this.spinner.show(); } else { this.spinner.hide(); } }
}