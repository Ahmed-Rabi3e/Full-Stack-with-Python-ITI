import math

# Decorator to validate input (non-negative values)
def validate_input(func):
    def wrapper(self, value):
        if value < 0:
            raise ValueError("Value must be non-negative.")
        return func(self, value)
    return wrapper


# Instance Counter using classmethod
class InstanceCounter:
    count = 0

    def _init_(self):
        InstanceCounter.count += 1

    @classmethod
    def get_count(cls):
        return cls.count


# Rectangle with properties for area and perimeter
class Rectangle:
    def _init_(self, width, height):
        self._width = width
        self._height = height

    @property
    def area(self):
        return self._width * self._height

    @property
    def perimeter(self):
        return 2 * (self._width + self._height)


# Circle class using all features
class Circle:
    _count = 0

    def _init_(self, radius):
        self.radius = radius
        Circle._count += 1

    @classmethod
    def get_instance_count(cls):
        return cls._count

    @property
    def area(self):
        return math.pi * self.radius ** 2

    @property
    def circumference(self):
        return 2 * math.pi * self.radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    @validate_input
    def radius(self, value):
        self._radius = value


# Example usage
if __name__ == "_main_":
    print("=== Rectangle ===")
    rect = Rectangle(10, 5)
    print("Area:", rect.area)
    print("Perimeter:", rect.perimeter)

    print("\n=== Circle ===")
    c1 = Circle(3)
    print("Circle 1 Area:", c1.area)
    print("Circle 1 Circumference:", c1.circumference)

    try:
        c2 = Circle(-5)
    except ValueError as e:
        print("Error:", e)

    print("Total Circles Created:", Circle.get_instance_count())
    