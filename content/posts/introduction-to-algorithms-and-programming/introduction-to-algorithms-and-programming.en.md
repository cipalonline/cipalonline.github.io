+++
title = 'Introduction to Algorithms and Programming'
date = 2024-04-13T21:22:52-04:00
description = "Dive into the fascinating world of algorithms and programming with our introductory post. Explore the fundamental concepts of algorithms and how they differ from programs, and discover the importance of data and how they transform into valuable information."
tags = [
    "Programming",
    "Algorithms",
    "Introducción",
]
categories = [
    "Algorithms and Programming",
]
aliases = ['Introduction to Algorithms and Programming']
+++

# What is an Algorithm and how does it differ from a Program?

An **algorithm** is a set of step-by-step instructions that define how a task should be performed. In programming, algorithms are fundamental as they define the logic that computers must follow to solve specific problems.

A **program** is the implementation of one or more algorithms in a specific programming language. While an algorithm can be represented in many ways, a program is a concrete artifact that can be executed by a computer.

## Parts of an Algorithm
An algorithm consists of three main parts:

1. **Input**: The data that is entered into the algorithm.
2. **Process**: The operations that are performed on the input data.
3. **Output**: The result obtained after processing the data.
   
## Characteristics of an Algorithm
Algorithms must be:

1. **Sequential**: Instructions are executed one after another.
2. **Precise**: Each instruction must be clear and unambiguous.
3. **Ordered**: Instructions must be in a specific order.
4. **Finite**: The algorithm must have an end after a finite number of steps.
5. **Defined**: Each step must be defined and effective.

## How to create an Algorithm
The process of creating an algorithm involves several key steps:

1. **Define the problem**: Before starting to write an algorithm, we must clearly understand the problem we are trying to solve.
2. **Identify the inputs and outputs**: We must determine what data is needed to solve the problem (inputs) and what results we expect to obtain (outputs).
3. **Design the algorithm's logic**: At this point, **abstraction** becomes a crucial tool. Abstraction allows us to identify and extract the essential data to solve the problem and discard everything that does not contribute to the solution. This allows us to simplify the problem, eliminating unnecessary details and reducing it to its most manageable components. In this way, abstraction helps us handle even the most complex problems in a more efficient and effective way.
4. **Write the algorithm**: Once we have designed the logic, we can start writing the algorithm, making sure that each step is clear, precise, and ordered.
5. **Test the algorithm**: Finally, we must test the algorithm to ensure that it produces the expected results.

## Programming Languages
Abstraction becomes an essential tool for understanding and designing efficient algorithms, but to be able to develop the programs that computers can execute we need the so-called **programming languages**.

**Programming languages** are tools that we use to write instructions that computers can understand and execute. They are like the bridge between humans and machines, allowing us to communicate our ideas and problem solutions in a way that a computer can carry out.

There are many programming languages, each with its own rules (syntax) and particular uses. Some are more suitable for specific tasks, while others are more versatile. Programming languages are essential for implementing algorithms into executable programs.

# What is Data and what is Information?

**Data** are raw facts that on their own may not make sense. However, when these data are processed, organized, structured, or presented in a given context, they become useful information. Therefore, we can say that **data plus interpretation gives us valuable Information**.

## Data Types
### Elementary
**Elementary data types** are the most basic building blocks of programming. These include:

1. **Integers (int)**: These are numbers without decimals. For example, 5, -3, 0 are integers.
2. **Floating point (float)**: These are numbers with decimals. For example, 3.14, -0.01 are floating point numbers.
3. **Booleans (bool)**: These are truth values, that is, true or false.
4. **Characters (char)**: These are individual letters, numbers, or symbols. For example, 'a', 'Z', '3', '$' are characters.

### Structured
**Structured data types** are more complex and are used to organize and store collections of data. These include:

1. **Homogeneous Data**: These are those that store or group elements of the same type. A common example of this are arrays or vectors, where each element in the array is of the same data type. For example, an array of integers will only contain integer numbers.
3. **Heterogeneous Data**: These are those that can store or group elements of different data types. A common example of this are structures (in languages like C) or objects (in object-oriented languages like Java or Python), where each member or attribute can be of a different data type. For example, a "Student" object could have a "name" attribute of string type, an "age" attribute of integer type, and a "grades" attribute that is an array of decimal numbers.

## Casting
In programming, we often find ourselves in situations where we need to work with data that is not of the type we need. Casting, also known as **casting** or **type casting**, is a process in programming where we convert a variable from one data type to another. This is useful when we want to perform operations that require a specific data type.

There are two main types of casting:

1. **Implicit Casting**: This occurs when the compiler automatically converts one data type to another without the need for the programmer to explicitly specify the conversion. For example, if you try to add an integer with a floating point number, the compiler will automatically convert the integer to a floating point number before performing the sum.
2. **Explicit Casting**: This occurs when the programmer explicitly specifies the conversion of one data type to another. This is done using the casting syntax. For example, in C++, if you have a variable of type `double` and you want to convert it to `int`, you can do so in the following way: `int myVariable = (int)myDouble;`.

It is important to note that not all data types can be converted to other data types. Some conversions can lead to data loss, such as when we convert a floating point number to an integer, where the decimal part is discarded.

## Operators
Once we have our data, whether elementary or structured, we need a way to manipulate them to solve problems and create useful programs. This is where **operators** come in.

An **operator** in programming is a symbol that tells the compiler or interpreter to perform specific mathematical, logical, and relational operations. Operators are used to manipulate data and variables in programs. Some common examples of operators include `+`, `-`, `*`, `/`, and `=`. Each operator has a specific function and the operation it performs depends on the type of data it is used with.

### Types of Operators
It is important to mention that operators have an **order of priority** that determines the order in which operations are performed in an expression. The operators discussed below are ordered by their priority, with arithmetic operators being the highest priority and assignment operators being the lowest priority.

It should be clarified that before all these operators, the **parentheses** (`()`) have the highest priority (priority 0). This means that any operation within the parentheses will be performed before any other operation. In addition, operations at the same level will be performed from left to right.

#### 1) Arithmetic Operators
These operators are used to perform mathematical operations. They return a numeric value that can be an integer or a floating point number, depending on the operands.

- `*`: This is the **multiplication** operator. It multiplies two values.
- `/`: This is the **division** operator. It divides the value on the left by the value on the right.
- `%`: This is the **modulo** operator. It returns the remainder of the division of the value on the left by the value on the right.
- `pow`: This is the **power** function. It raises the first value to the power of the second value.
- `+`: This is the **addition** operator. It adds two values.
- `-`: This is the **subtraction** operator. It subtracts the value on the right from the value on the left.
- `++`: This is the **increment** operator. It increases the value of the variable by one.
- `--`: This is the **decrement** operator. It decreases the value of the variable by one.

#### 2) Comparison Operators
These operators are used to compare two values. They always return a boolean value (`true` or `false`).

- `<`: This is the **less than** operator. It returns true if the value on the left is less than the value on the right.
- `<=`: This is the **less than or equal to** operator. It returns true if the value on the left is less than or equal to the value on the right.
- `>`: This is the **greater than** operator. It returns true if the value on the left is greater than the value on the right.
- `>=`: This is the **greater than or equal to** operator. It returns true if the value on the left is greater than or equal to the value on the right.
- `==`: This is the **equality** operator. It returns true if the two values are equal.
- `!=`: This is the **inequality** operator. It returns true if the two values are not equal.

#### 3) Logical Operators
These operators are used to perform logical operations. They return a boolean value (`true` or `false`).

- `&&`: This is the logical **AND** operator. It returns true if both operands are true.
- `||`: This is the logical **OR** operator. It returns true if at least one of the operands is true.

#### 4) Assignment Operators
These operators are used to assign a new value to a variable. The data type they return depends on the data type of the operands.

- `=`: This is the **assignment** operator. It assigns the value on the right to the variable on the left.
- `+=`: This is the **addition and assignment** operator. It adds the value on the right to the value on the left and assigns the result to the variable on the left.
- `-=`: This is the **subtraction and assignment** operator. It subtracts the value on the right from the value on the left and assigns the result to the variable on the left.
- `*=`: This is the **multiplication and assignment** operator. It multiplies the value on the left by the value on the right and assigns the result to the variable on the left.
- `/=`: This is the **division and assignment** operator. It divides the value on the left by the value on the right and assigns the result to the variable on the left.
- `%=`: This is the **modulo and assignment** operator. It takes the modulo of the value on the left by the value on the right and assigns the result to the variable on the left.
- `&=`: This is the **AND and assignment** operator. It performs a bitwise AND operation on the value on the left with the value on the right and assigns the result to the variable on the left.

# What are Variables?

In programming, a **variable** can be imagined as a box in which we can store data. This "box" has a unique name that we use to refer to the data it contains. When we create a variable, we reserve a space in the computer's memory to store a value. This value can change over time, hence the name "variable".

At the hardware level, when we declare a variable, the system reserves a space in the computer's RAM. The amount of memory reserved depends on the type of data that the variable is going to store. Each variable has a unique memory address, and when we reference the variable in our code, the system knows to look at that specific memory address.

## Good Practices for Naming Variables
1. **Clarity**: The name of the variable should clearly indicate what type of data it stores and what it is used for.
2. **Brevity**: Although clarity is important, variable names should also be as short as possible. A variable name that is too long can make the code difficult to read.
3. **Consistency**: You should follow a consistent naming method throughout your code. This makes your code easier to read and maintain.

## Most Common Methods for Naming Variables
1. **lowerCamelCase**: The first letter of the first word in lowercase, and the first letter of each subsequent word in uppercase. For example: `myVariable`.
2. **UpperCamelCase**: The first letter of each word in uppercase. For example: `MyVariable`.
3. **snake_case**: All letters in lowercase with underscores between words. For example: `my_variable`.

Remember, the naming method you choose may depend on the programming language you are using, as some languages have their own naming conventions.

## Variable Declaration
```cpp
int myVariable = 10;
```

1. `int`: This is the **data type** of the variable. In this case, it's an integer (`int`).
2. `myVariable`: This is the **name of the variable**. You can choose any name for your variables, but it's good practice to choose names that describe the purpose of the variable in your program.
3. `=`: This is the **assignment operator**. This operator is used to assign a value to the variable. In this case, we are assigning the value `10` to `myVariable`.
4. `10`: This is the **initial value** of the variable. In this case, we are initializing `myVariable` with the value `10`. Initialization is optional in the declaration of a variable. If you don't initialize a variable in its declaration, its value will be indeterminate until you assign one.

It's important to mention that in C++, each variable declaration must end with a semicolon (`;`).

# What are Conditionals?

**Conditionals** are control structures that allow us to make decisions in our programs. Depending on whether a condition is true or false, one block of code or another will be executed. This allows us to create programs that can adapt to different situations and make decisions based on user input, program state, data retrieved from a database, etc.

There are three main types of conditionals:

1. **if**: This is the most basic conditional. If the condition inside the `if` is true, the block of code inside the `if` is executed. If the condition is false, the block of code is skipped.

2. **else**: It is used together with `if`. The block of code inside the `else` is executed if the condition in the previous `if` is false.

3. **else if (elif in some languages)**: It is used to check multiple conditions. If the condition in the previous `if` is false, the next condition in the `elif` is checked. If this condition is true, the block of code inside the `elif` is executed. You can have as many `elif` as you want in your code.

An example of the use of conditionals applied in C++ is as follows:

```cpp
int x = 10;

if (x > 10) {
    cout << "x is greater than 10";
} else if (x < 10) {
    cout << "x is less than 10";
} else {
    cout << "x is equal to 10";
}
```

In this example, since `x` is equal to 10, it will print "x is equal to 10". If we change the value of `x`, a different message will be printed depending on the new value.