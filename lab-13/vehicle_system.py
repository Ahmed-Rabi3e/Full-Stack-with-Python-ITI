class Vehicle:
    def __init__(self, name, speed):
        self.name = name
        self.speed = speed

    def start_engine(self):
        return "Engine started"

    def describe(self):
        return f"{self.name} moves at {self.speed} km/h"

# Single Inheritance
class Car(Vehicle):
    def __init__(self, name, speed, brand):
        super().__init__(name, speed)
        self.brand = brand

    def describe(self):
        return f"{super().describe()} (Brand: {self.brand})"

# Multilevel Inheritance
class ElectricCar(Car):
    def __init__(self, name, speed, brand, battery_range):
        super().__init__(name, speed, brand)
        self.battery_range = battery_range

    def start_engine(self):
        return "Electric motor activated!"

# Polymorphism 
class Bicycle:
    def __init__(self, name, speed):
        self.name = name
        self.speed = speed

    def start_engine(self):
        return "Pedals engaged! No engine here."

    def describe(self):
        return f"{self.name} pedals at {self.speed} km/h"



v1 = Vehicle("Generic Vehicle", 80)
c1 = Car("Sedan", 120, "Toyota")
ec1 = ElectricCar("Model S", 150, "Tesla", 500)
b1 = Bicycle("Mountain Bike", 25)

vehicles = [v1, c1, ec1, b1]

print("=== Vehicle Management System Output ===")
for v in vehicles:
    print(v.start_engine())
    print(v.describe())
    print("-" * 50)
