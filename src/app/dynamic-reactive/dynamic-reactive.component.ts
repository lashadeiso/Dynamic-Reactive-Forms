import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ValueFromArray } from 'rxjs';

@Component({
  selector: 'app-dynamic-reactive',
  templateUrl: './dynamic-reactive.component.html',
  styleUrls: ['./dynamic-reactive.component.css'],
})
export class DynamicReactiveComponent implements OnInit {
  workExps!: FormGroup;

  constructor(private fbuilder: FormBuilder) {
    this.workExps = this.fbuilder.group({
      jobs: this.fbuilder.array([]),
    });
  }

  getJobs(): FormArray {
    return this.workExps.get('jobs') as FormArray;
  }

  createJob(): FormGroup {
    return this.fbuilder.group({
      companyName: '',
      companyWebPage: '',
      companyDescription: '',
      positions: this.fbuilder.array([]),
    });
  }

  getPositionsOfJob(jobIndex: number): FormArray {
    return this.getJobs().at(jobIndex).get('positions') as FormArray;
  }

  createPosition(): FormGroup {
    return this.fbuilder.group({
      positionName: '',
      from: '',
      to: '',
      level: '',
      descriotion: '',
    });
  }

  ngOnInit(): void {}

  /// methods for view

  addNewJob(): void {
    this.getJobs().push(this.createJob());
  }

  deleteJob(jobIndex: number): void {
    this.getJobs().removeAt(jobIndex);
  }

  addNewPositionForJob(jobIndex: number): void {
    this.getPositionsOfJob(jobIndex).push(this.createPosition());
  }

  deletePositionForJob(jobIndex: number, positionIndex: number): void {
    this.getPositionsOfJob(jobIndex).removeAt(positionIndex);
  }

  onFormSubmit() {
    console.log(this.workExps.value);
    this.workExps.reset();
  }
}
