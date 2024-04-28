import { Component, NgModule } from '@angular/core';
import { Employee } from './models/employee';
import { EmployeeService } from './employee.service';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule], // Asegúrate de incluir FormsModule aquí
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  employee: Employee = {
    id: 1,
    name: 'John Doe',
    country: 'USA'
  };

  constructor(private employeeService: EmployeeService) { }

  addEmployee(): void {
    this.employeeService.addEmployee(this.employee);
    this.employee = { id: 0, name: '', country: '' }; // Limpiar los campos después de agregar
  }
}
