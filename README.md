# Mountebank 101

## [Day 1: Hello, World! Mountebank](day1/Day1_HelloWorldMountebank.md)

- The Problem with End-to-End Testing
- Setting up
  - 3A pattern: Arrange, Act, Assert, Cleanup
  - Imposters: virtual services, a lightweight operation
- Hello imposter
  - Run: [Command line]
  - Create: [HTTP, file]
  - Delete: [HTTP]
- Saving multiple Imposters in the config file
- EJS

## [Day 2: Predicates](day2/Day2_Predicates.md)

- Using predicates to send different responses for different requests
- Simplifying predicates on JSON request bodies
- Using XPath to simplify predicates on XML request bodies

## Day 3: Record/Replay

- Setting up a proxy
- Generating the Correct Predicates
- Capturing multiple responses for the same request
- Ways to Replay a Proxy

## Day 4: Behavior and Programming mountebank

- Creating Your Own Predicate
- Creating your own Dynamic Response

## Day 5: Adding Behaviors

- Understand behaviors
- Decorating a response
- Adding latency to a Response
- Repeating a Response Multiple Times
- Replacing Content in The Response

## Tricks

- HTTPS
- CORS: Cross-origin resource sharing
- Stub the Legacy Service
- The --datadir option

## Setup and Install Mountebank

- Node.js
  - 12.16.1 LTS
  - 13.12.0
- mb
  - npm: npm install -g mountebank
  - yarn: yarn global add mountebank
