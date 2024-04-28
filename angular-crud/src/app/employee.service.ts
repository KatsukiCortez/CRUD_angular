import { Injectable } from '@angular/core';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [];

  constructor() { }

  // Método para obtener todos los empleados
  getEmployees(): Employee[] {
    return this.employees;
  }

  // Método para agregar un nuevo empleado
  addEmployee(employee: Employee): void {
    this.employees.push(employee);
  }

  // Método para eliminar un empleado por su ID
  deleteEmployee(id: number): void {
    this.employees = this.employees.filter(e => e.id !== id);
  }

  // Método para actualizar un empleado
  updateEmployee(updatedEmployee: Employee): void {
    const index = this.employees.findIndex(e => e.id === updatedEmployee.id);
    if (index !== -1) {
      this.employees[index] = updatedEmployee;
    }
  }
}
