export default {
  mermaidUml: `
  classDiagram
class ServiceType {
<< enumeration>>
+ GOLD
+ SILVER
+ BRONZE
}

class ServiceLevel {
<< enumeration>>
+ BASIC
+ STANDARD
+ PREMIUM
}

class Service {
<< concept>>
+ ServiceType serviceType
+ ServiceLevel serviceLevel
+ Double price
}

Service "1" *-- "1" ServiceType
Service "1" *-- "1" ServiceLevel
class Organization {
<< concept>>
+ String name
+ String address
+ String contactName
+ String contactEmail
}

class ServiceLevelAgreement {
<< concept>>
+ Organization customer
+ Organization provider
+ Service service
+ DateTime startDate
+ DateTime endDate
+ Double penaltyPercentage
+ Boolean autoRenewal
}

ServiceLevelAgreement "1" *-- "1" Organization
ServiceLevelAgreement "1" *-- "1" Organization
ServiceLevelAgreement "1" *-- "1" Service

  `,
  typescript: ` 
  // imports
  import {IConcept} from './concerto@1.0.0';
  
  // interfaces
  export enum ServiceType {
     GOLD = 'GOLD',
     SILVER = 'SILVER',
     BRONZE = 'BRONZE',
  }
  
  export enum ServiceLevel {
     BASIC = 'BASIC',
     STANDARD = 'STANDARD',
     PREMIUM = 'PREMIUM',
  }
  
  export interface IService extends IConcept {
     serviceType: ServiceType;
     serviceLevel: ServiceLevel;
     price: number;
  }
  
  export interface IOrganization extends IConcept {
     name: string;
     address: string;
     contactName: string;
     contactEmail: string;
  }
  
  export interface IServiceLevelAgreement extends IConcept {
     customer: IOrganization;
     provider: IOrganization;
     service: IService;
     startDate: Date;
     endDate: Date;
     penaltyPercentage: number;
     autoRenewal: boolean;
  }`,
  jsonSchema: `
  {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": {
      "org.example.sla@0.0.2.ServiceType": {
        "title": "ServiceType",
        "description": "An instance of org.example.sla@0.0.2.ServiceType",
        "enum": [
          "GOLD",
          "SILVER",
          "BRONZE"
        ]
      },
      "org.example.sla@0.0.2.ServiceLevel": {
        "title": "ServiceLevel",
        "description": "An instance of org.example.sla@0.0.2.ServiceLevel",
        "enum": [
          "BASIC",
          "STANDARD",
          "PREMIUM"
        ]
      },
      "org.example.sla@0.0.2.Service": {
        "title": "Service",
        "description": "An instance of org.example.sla@0.0.2.Service",
        "type": "object",
        "properties": {
          "$class": {
            "type": "string",
            "default": "org.example.sla@0.0.2.Service",
            "pattern": "^org\\.example\\.sla@0\\.0\\.2\\.Service$",
            "description": "The class identifier for org.example.sla@0.0.2.Service"
          },
          "serviceType": {
            "$ref": "#/definitions/org.example.sla@0.0.2.ServiceType"
          },
          "serviceLevel": {
            "$ref": "#/definitions/org.example.sla@0.0.2.ServiceLevel"
          },
          "price": {
            "type": "number"
          }
        },
        "required": [
          "$class",
          "serviceType",
          "serviceLevel",
          "price"
        ]
      },
      "org.example.sla@0.0.2.Organization": {
        "title": "Organization",
        "description": "An instance of org.example.sla@0.0.2.Organization",
        "type": "object",
        "properties": {
          "$class": {
            "type": "string",
            "default": "org.example.sla@0.0.2.Organization",
            "pattern": "^org\\.example\\.sla@0\\.0\\.2\\.Organization$",
            "description": "The class identifier for org.example.sla@0.0.2.Organization"
          },
          "name": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "contactName": {
            "type": "string"
          },
          "contactEmail": {
            "type": "string"
          }
        },
        "required": [
          "$class",
          "name",
          "address",
          "contactName",
          "contactEmail"
        ]
      },
      "org.example.sla@0.0.2.ServiceLevelAgreement": {
        "title": "ServiceLevelAgreement",
        "description": "An instance of org.example.sla@0.0.2.ServiceLevelAgreement",
        "type": "object",
        "properties": {
          "$class": {
            "type": "string",
            "default": "org.example.sla@0.0.2.ServiceLevelAgreement",
            "pattern": "^org\\.example\\.sla@0\\.0\\.2\\.ServiceLevelAgreement$",
            "description": "The class identifier for org.example.sla@0.0.2.ServiceLevelAgreement"
          },
          "customer": {
            "$ref": "#/definitions/org.example.sla@0.0.2.Organization"
          },
          "provider": {
            "$ref": "#/definitions/org.example.sla@0.0.2.Organization"
          },
          "service": {
            "$ref": "#/definitions/org.example.sla@0.0.2.Service"
          },
          "startDate": {
            "format": "date-time",
            "type": "string"
          },
          "endDate": {
            "format": "date-time",
            "type": "string"
          },
          "penaltyPercentage": {
            "type": "number"
          },
          "autoRenewal": {
            "type": "boolean"
          }
        },
        "required": [
          "$class",
          "customer",
          "provider",
          "service",
          "startDate",
          "endDate",
          "penaltyPercentage",
          "autoRenewal"
        ]
      }
    }
  }
  `,
  xmlSchema: `
  <?xml version="1.0"?>
<xs:schema xmlns:org.example.sla="org.example.sla" targetNamespace="org.example.sla" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema" 
xmlns:concerto="concerto"
>
<xs:import namespace="concerto" schemaLocation="concerto@1.0.0.xsd"/>
<xs:simpleType name="ServiceType">
   <xs:restriction base="xs:string">
      <xs:enumeration value="GOLD"/>
      <xs:enumeration value="SILVER"/>
      <xs:enumeration value="BRONZE"/>
   </xs:restriction>
</xs:simpleType>
<xs:element name="ServiceType" type="org.example.sla:ServiceType"/>
<xs:simpleType name="ServiceLevel">
   <xs:restriction base="xs:string">
      <xs:enumeration value="BASIC"/>
      <xs:enumeration value="STANDARD"/>
      <xs:enumeration value="PREMIUM"/>
   </xs:restriction>
</xs:simpleType>
<xs:element name="ServiceLevel" type="org.example.sla:ServiceLevel"/>
<xs:complexType name="Service">
   <xs:complexContent>
   <xs:extension base="concerto:Concept">
   <xs:sequence>
      <xs:element name="serviceType" type="org.example.sla:ServiceType"/>
      <xs:element name="serviceLevel" type="org.example.sla:ServiceLevel"/>
      <xs:element name="price" type="xs:double"/>
   </xs:sequence>
   </xs:extension>
   </xs:complexContent>
</xs:complexType>
<xs:element name="Service" type="org.example.sla:Service"/>
<xs:complexType name="Organization">
   <xs:complexContent>
   <xs:extension base="concerto:Concept">
   <xs:sequence>
      <xs:element name="name" type="xs:string"/>
      <xs:element name="address" type="xs:string"/>
      <xs:element name="contactName" type="xs:string"/>
      <xs:element name="contactEmail" type="xs:string"/>
   </xs:sequence>
   </xs:extension>
   </xs:complexContent>
</xs:complexType>
<xs:element name="Organization" type="org.example.sla:Organization"/>
<xs:complexType name="ServiceLevelAgreement">
   <xs:complexContent>
   <xs:extension base="concerto:Concept">
   <xs:sequence>
      <xs:element name="customer" type="org.example.sla:Organization"/>
      <xs:element name="provider" type="org.example.sla:Organization"/>
      <xs:element name="service" type="org.example.sla:Service"/>
      <xs:element name="startDate" type="xs:dateTime"/>
      <xs:element name="endDate" type="xs:dateTime"/>
      <xs:element name="penaltyPercentage" type="xs:double"/>
      <xs:element name="autoRenewal" type="xs:boolean"/>
   </xs:sequence>
   </xs:extension>
   </xs:complexContent>
</xs:complexType>
<xs:element name="ServiceLevelAgreement" type="org.example.sla:ServiceLevelAgreement"/>
</xs:schema>
`,
  csharp: `
  namespace Org.Example.Sla;
using AccordProject.Concerto;
[System.Text.Json.Serialization.JsonConverter(typeof(System.Text.Json.Serialization.JsonStringEnumConverter))]
public enum ServiceType {
      GOLD,
      SILVER,
      BRONZE,
}
[System.Text.Json.Serialization.JsonConverter(typeof(System.Text.Json.Serialization.JsonStringEnumConverter))]
public enum ServiceLevel {
      BASIC,
      STANDARD,
      PREMIUM,
}
[AccordProject.Concerto.Type(Namespace = "org.example.sla", Version = "0.0.2", Name = "Service")]
[System.Text.Json.Serialization.JsonConverter(typeof(AccordProject.Concerto.ConcertoConverterFactorySystem))]
public class Service : Concept {
   [System.Text.Json.Serialization.JsonPropertyName("$class")]
   public override string _Class { get; } = "org.example.sla@0.0.2.Service";
   [System.Text.Json.Serialization.JsonPropertyName("serviceType")]
   public ServiceType ServiceType { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("serviceLevel")]
   public ServiceLevel ServiceLevel { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("price")]
   public float Price { get; set; }
}
[AccordProject.Concerto.Type(Namespace = "org.example.sla", Version = "0.0.2", Name = "Organization")]
[System.Text.Json.Serialization.JsonConverter(typeof(AccordProject.Concerto.ConcertoConverterFactorySystem))]
public class Organization : Concept {
   [System.Text.Json.Serialization.JsonPropertyName("$class")]
   public override string _Class { get; } = "org.example.sla@0.0.2.Organization";
   [System.Text.Json.Serialization.JsonPropertyName("name")]
   public string Name { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("address")]
   public string Address { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("contactName")]
   public string ContactName { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("contactEmail")]
   public string ContactEmail { get; set; }
}
[AccordProject.Concerto.Type(Namespace = "org.example.sla", Version = "0.0.2", Name = "ServiceLevelAgreement")]
[System.Text.Json.Serialization.JsonConverter(typeof(AccordProject.Concerto.ConcertoConverterFactorySystem))]
public class ServiceLevelAgreement : Concept {
   [System.Text.Json.Serialization.JsonPropertyName("$class")]
   public override string _Class { get; } = "org.example.sla@0.0.2.ServiceLevelAgreement";
   [System.Text.Json.Serialization.JsonPropertyName("customer")]
   public Organization Customer { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("provider")]
   public Organization Provider { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("service")]
   public Service Service { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("startDate")]
   public System.DateTime StartDate { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("endDate")]
   public System.DateTime EndDate { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("penaltyPercentage")]
   public float PenaltyPercentage { get; set; }
   [System.Text.Json.Serialization.JsonPropertyName("autoRenewal")]
   public bool AutoRenewal { get; set; }
}

  `,
  go: `
  package org_example_sla_0_0_2
  import "time"
  import "concerto_1_0_0";
     
  type ServiceType int
  const (
     GOLD ServiceType = 1 + iota
     SILVER
     BRONZE
  )
  type ServiceLevel int
  const (
     BASIC ServiceLevel = 1 + iota
     STANDARD
     PREMIUM
  )
  type Service struct {
     concerto_1_0_0.Concept
     ServiceType ServiceType \`json:"serviceType"\`
     ServiceLevel ServiceLevel \`json:"serviceLevel"\`
     Price float64 \`json:"price"\`
  }
  type Organization struct {
     concerto_1_0_0.Concept
     Name string \`json:"name"\`
     Address string \`json:"address"\`
     ContactName string \`json:"contactName"\`
     ContactEmail string \`json:"contactEmail"\`
  }
  type ServiceLevelAgreement struct {
     concerto_1_0_0.Concept
     Customer Organization \`json:"customer"\`
     Provider Organization \`json:"provider"\`
     Service Service \`json:"service"\`
     StartDate time.Time \`json:"startDate"\`
     EndDate time.Time \`json:"endDate"\`
     PenaltyPercentage float64 \`json:"penaltyPercentage"\`
     AutoRenewal bool \`json:"autoRenewal"\`
  }
  `,
  protobuf: `
ssyntax = "proto3";

package org.example.sla.v0_0_2;

import "google/protobuf/timestamp.proto";

enum ServiceType {
  ServiceType_BRONZE = 0;
  ServiceType_GOLD = 1;
  ServiceType_SILVER = 2;
}

enum ServiceLevel {
  ServiceLevel_BASIC = 0;
  ServiceLevel_PREMIUM = 1;
  ServiceLevel_STANDARD = 2;
}

message Service {
  double price = 1;
  ServiceLevel serviceLevel = 2;
  ServiceType serviceType = 3;
}

message Organization {
  string address = 1;
  string contactEmail = 2;
  string contactName = 3;
  string name = 4;
}

message ServiceLevelAgreement {
  bool autoRenewal = 1;
  Organization customer = 2;
  google.protobuf.Timestamp endDate = 3;
  double penaltyPercentage = 4;
  Organization provider = 5;
  Service service = 6;
  google.protobuf.Timestamp startDate = 7;
}

`,
};