
name = "Ahmed"
age = 25
skills = ["Python", "HTML", "CSS"]
info_dict = {"location": "Cairo", "experience": 2}

print("Type of name:", type(name))
print("Type of age:", type(age))
print("Type of skills:", type(skills))
print("Type of info_dict:", type(info_dict))

# Add one more skill
skills.append("JavaScript")
print("Updated skills:", skills)

class Employee:
    title = "PythonTech"

    def __init__(self, name, department, salary):
        self.name = name
        self.department = department
        self.salary = salary

    def display_info(self):
        return f"Name: {self.name}, Department: {self.department}, Salary: {self.salary}"

    def year_salary(self):
        return self.salary * 12

    # Class method 
    @classmethod
    def get_company(cls):
        return cls.title

    # Static method 
    @staticmethod
    def valid_salary(salary):
        return salary >= 6000

emp1 = Employee("Sara", "HR", 7000)
emp2 = Employee("Ahmed", "IT", 9500)  # I really wish that

print(emp1.display_info())
print(emp2.display_info())

print("Yearly Salary:", emp1.year_salary())
print("Is valid salary?", Employee.valid_salary(emp1.salary))

print("Company Title:", Employee.get_company())
