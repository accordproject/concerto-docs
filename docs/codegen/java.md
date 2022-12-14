---
id: codegen-java
title: Java
---

Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.

```base
concerto compile --model test.cto --target java
```

## Sample Output

```java
// this code is generated and should not be modified
package test;

import concerto.Concept;
import concerto.Asset;
import concerto.Transaction;
import concerto.Participant;
import concerto.Event;
import com.fasterxml.jackson.annotation.*;

@JsonTypeInfo(use = JsonTypeInfo.Id.CLASS, property = "$class")
@JsonIgnoreProperties({"id"})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "email")
public class Person extends Concept {
   
   // the accessor for the identifying field
   public String getID() {
      return this.getEmail();
   }

   private String email;
   private java.util.Date dob;
   public String getEmail() {
      return this.email;
   }
   public java.util.Date getDob() {
      return this.dob;
   }
   public void setEmail(String email) {
      this.email = email;
   }
   public void setDob(java.util.Date dob) {
      this.dob = dob;
   }
}
```

## Options

None.

## Limitations

1. Scalars are unboxed as properties