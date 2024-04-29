import { Component, NgModule, OnInit } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeService } from './employee.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  employees: Employee[] = [];
  employee: Employee = {
    id: 0,
    name: 'John Doe',
    country: 'USA'
  };
  nextId: number = 1;
  searchTerm: string = '';
  filteredEmployees: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees = this.employeeService.getEmployees();
    if (this.employees.length > 0) {
      this.nextId = Math.max(...this.employees.map(emp => emp.id)) + 1;
    }
    this.filteredEmployees = [...this.employees];
  }

  addEmployee(): void {
    this.employee.id = this.nextId;
    this.employeeService.addEmployee(this.employee);
    this.employee = { id: 0, name: '', country: '' };
    this.nextId++;
    this.loadEmployees();
  }

  editEmployee(emp: Employee): void {
  }

  deleteEmployee(emp: Employee): void {
    const index = this.employees.findIndex(e => e.id === emp.id);
    if (index !== -1) {
      this.employeeService.deleteEmployee(emp.id);
      this.loadEmployees();
    }
  }
  searchEmployee(): void {
    if (!this.searchTerm.trim()) {
      this.filteredEmployees = [...this.employees];
      return;
    }

    this.filteredEmployees = this.employees.filter(emp =>
      emp.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    this.employees = [...this.filteredEmployees];
  }
}
