import React, { useState, useRef, useEffect } from 'react';
import styles from './ConcertoConverter.module.css';

// Ensure regeneratorRuntime is available globally for async/await in dynamically imported modules
import regeneratorRuntime from 'regenerator-runtime';
if (typeof window !== 'undefined') {
  window.regeneratorRuntime = regeneratorRuntime;
}

let Parser, Printer;

// Syntax highlighting functions based on actual parsing correspondence
const highlightCTO = (code) => {
  if (!code) return '';
  return code
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    // Namespace - purple (matches "namespace" in JSON)
    .replace(/\b(namespace)\b/g, '<span class="syntax-namespace">$1</span>')
    // Concept/Asset/etc names - yellow (matches "name" value in ConceptDeclaration)
    .replace(/\b(concept|asset|participant|transaction|event|enum)\s+(\w+)/g, 
      (match, keyword, name) => `<span class="syntax-keyword">${keyword}</span> <span class="syntax-concept-name">${name}</span>`)
    // Enum values - keep each value highlighted without disturbing newlines
    .replace(/^(\s*)o\s+(\w+)\s*$/gm, (match, indent, value) => {
      return `${indent}o <span class="syntax-enum-value">${value}</span>`;
    })
    // Types - blue (matches StringProperty, DateTimeProperty in JSON)
    .replace(/\b(String|Integer|Double|Long|DateTime|Boolean)\b/g, '<span class="syntax-type">$1</span>')
    // Property names - green (matches "name" in property objects)
    .replace(/^(\s*)o\s+(\w+)\s+(\w+)/gm, (match, indent, type, propName) => {
      const typeClass = /^(String|Integer|Double|Long|DateTime|Boolean)$/.test(type) ? 'syntax-type' : 'syntax-custom-type';
      return `${indent}o <span class="${typeClass}">${type}</span> <span class="syntax-prop-name">${propName}</span>`;
    })
    // Modifiers - cyan (matches isOptional, isArray in JSON)
    .replace(/\b(optional|identified by|extends|abstract)\b/g, '<span class="syntax-modifier">$1</span>')
    .replace(/\b(import|from)\b/g, '<span class="syntax-keyword">$1</span>');
};

const highlightJSON = (json) => {
  if (!json) return '';
  try {
    const formatted = JSON.stringify(JSON.parse(json), null, 2);
    return formatted
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      // "namespace" key - purple (matches namespace keyword in CTO)
      .replace(/"(namespace)":/g, '"<span class="syntax-namespace">$1</span>":')
      // Concept declaration names - yellow (matches concept names in CTO)
      .replace(/"name":\s*"(\w+)"/g, (match, name) => {
        // This could be a concept name or property name - we'll style them the same as CTO
        return `"name": "<span class="syntax-concept-name">${name}</span>"`;
      })
      // Type properties - blue (matches String, DateTime in CTO)
      .replace(/"(String|Integer|Double|Long|DateTime|Boolean)Property"/g, 
        '"<span class="syntax-type">$1</span>Property"')
      // ConceptDeclaration - yellow
      .replace(/"ConceptDeclaration"/g, '"<span class="syntax-concept-name">ConceptDeclaration</span>"')
      // isOptional, isArray - cyan (matches optional modifier in CTO)
      .replace(/"(isOptional|isArray|identified)":/g, '"<span class="syntax-modifier">$1</span>":')
      // Other metadata keys
      .replace(/"(\$class|isAbstract|decorators|imports|declarations|properties)":/g, '"<span class="syntax-meta">$1</span>":')
      // Boolean values
      .replace(/:\s*(true|false|null)/g, ': <span class="syntax-bool">$1</span>');
  } catch (e) {
    return json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
};

// Dynamically import the Concerto modules
if (typeof window !== 'undefined') {
  import('@accordproject/concerto-cto').then((module) => {
    Parser = module.Parser;
    Printer = module.Printer;
  }).catch((err) => {
    console.warn('Could not load Concerto modules:', err);
  });
}

const defaultCTOExample = `namespace example@1.0.0

concept Person {
  o String firstName
  o String lastName
  o String email
}

concept Address {
  o String street
  o String city
  o String country
  o String postalCode
}`;

const defaultMetamodelExample = `{
  "$class": "concerto.metamodel@1.0.0.Model",
  "decorators": [],
  "namespace": "example@1.0.0",
  "imports": [],
  "declarations": [
    {
      "$class": "concerto.metamodel@1.0.0.ConceptDeclaration",
      "name": "Person",
      "isAbstract": false,
      "properties": [
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "firstName",
          "isArray": false,
          "isOptional": false
        },
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "lastName",
          "isArray": false,
          "isOptional": false
        },
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "email",
          "isArray": false,
          "isOptional": false
        }
      ]
    },
    {
      "$class": "concerto.metamodel@1.0.0.ConceptDeclaration",
      "name": "Address",
      "isAbstract": false,
      "properties": [
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "street",
          "isArray": false,
          "isOptional": false
        },
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "city",
          "isArray": false,
          "isOptional": false
        },
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "country",
          "isArray": false,
          "isOptional": false
        },
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "postalCode",
          "isArray": false,
          "isOptional": false
        }
      ]
    }
  ]
}`;

export default function ConcertoConverter() {
  const [ctoInput, setCtoInput] = useState(defaultCTOExample);
  const [metamodelInput, setMetamodelInput] = useState(defaultMetamodelExample);
  const [activeTab, setActiveTab] = useState('explorer');
  const [error, setError] = useState('');
  const [conversionMessage, setConversionMessage] = useState('');
  const [modulesLoaded, setModulesLoaded] = useState(false);
  
  const ctoTextareaRef = useRef(null);
  const ctoDisplayRef = useRef(null);
  const jsonTextareaRef = useRef(null);
  const jsonDisplayRef = useRef(null);

  // Load Concerto modules on component mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !modulesLoaded) {
      import('@accordproject/concerto-cto')
        .then((module) => {
          Parser = module.Parser;
          Printer = module.Printer;
          setModulesLoaded(true);
        })
        .catch((err) => {
          console.warn('Could not load Concerto modules:', err);
          setError('Failed to load Concerto modules. Please refresh the page.');
        });
    }
  }, []);

  const handleScroll = (textareaRef, displayRef) => {
    if (textareaRef.current && displayRef.current) {
      displayRef.current.scrollTop = textareaRef.current.scrollTop;
      displayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const validateJSON = (text) => {
    try {
      JSON.parse(text);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleCtoChange = (e) => {
    setCtoInput(e.target.value);
    setError('');
    setConversionMessage('');
  };

  const handleMetamodelChange = (e) => {
    setMetamodelInput(e.target.value);
    setError('');
    setConversionMessage('');
  };

  // Simple converter that demonstrates the concept
  // This shows the relationship, not actual Concerto parsing
  const convertCtoToMetamodel = () => {
    try {
      if (!modulesLoaded || !Parser) {
        setError('Concerto parser is still loading. Please try again in a moment.');
        return;
      }

      // Parse the CTO input
      const metamodel = Parser.parse(ctoInput, undefined, { skipLocationNodes: true });
      
      // Convert metamodel to JSON string
      const metamodelJson = JSON.stringify(metamodel, null, 2);
      
      setMetamodelInput(metamodelJson);
      setConversionMessage('');
      setError('');
    } catch (e) {
      setError('Parse error: ' + e.message);
      setConversionMessage('');
    }
  };

  const convertMetamodelToCto = () => {
    try {
      if (!modulesLoaded || !Printer) {
        setError('Concerto printer is still loading. Please try again in a moment.');
        return;
      }

      if (!validateJSON(metamodelInput)) {
        setError('Invalid JSON in metamodel');
        return;
      }

      // Parse the JSON metamodel
      const metamodel = JSON.parse(metamodelInput);
      
      // Convert metamodel to CTO
      const cto = Printer.toCTO(metamodel);
      
      setCtoInput(cto);
      setConversionMessage('');
      setError('');
    } catch (e) {
      setError('Print error: ' + e.message);
      setConversionMessage('');
    }
  };

  const resetToDefaults = () => {
    setCtoInput(defaultCTOExample);
    setMetamodelInput(defaultMetamodelExample);
    setError('');
  };

  const formatJSON = (text) => {
    try {
      const parsed = JSON.parse(text);
      return JSON.stringify(parsed, null, 2);
    } catch (e) {
      throw new Error('Invalid JSON');
    }
  };

  const handleFormatJSON = () => {
    try {
      setMetamodelInput(formatJSON(metamodelInput));
      setError('');
    } catch (e) {
      setError('Failed to format JSON: ' + e.message);
    }
  };

  return (
    <div className={styles.converterContainer}>
      <div className={styles.tabContainer}>
        <button
          className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'explorer' ? styles.active : ''}`}
          onClick={() => setActiveTab('explorer')}
        >
          Interactive Explorer
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className={styles.overviewSection}>
          <h3>Quick Example</h3>
          <p><strong>Your Model (CTO):</strong></p>
          <pre className={styles.codeBlock}>
{`namespace people@1.0.0

concept Person {
  o String name
  o Number age
}`}
          </pre>

          <p><strong>Becomes a Metamodel (JSON) that looks like:</strong></p>
          <pre className={styles.codeBlock}>
{`{
  "$class": "concerto.metamodel@1.0.0.Model",
  "namespace": "people@1.0.0",
  "declarations": [
    {
      "$class": "concerto.metamodel@1.0.0.ConceptDeclaration",
      "name": "Person",
      "properties": [
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "name"
        },
        {
          "$class": "concerto.metamodel@1.0.0.NumberProperty",
          "name": "age"
        }
      ]
    }
  ]
}`}
          </pre>

          <p>Each element in the metamodel has a <code>$class</code> property that identifies what type of Concerto object it represents.</p>
        </div>
      )}

      {activeTab === 'explorer' && (
        <div className={styles.explorerSection}>
          <h3>Interactive Metamodel Explorer</h3>
          <p>
            Edit the CTO on the left and click "Parse to Metamodel" to see how it converts to JSON. 
            Or edit the JSON on the right and click "Print to CTO" to convert back.
          </p>

          {error && <div className={styles.error}>{error}</div>}
          {conversionMessage && <div className={styles.message}>{conversionMessage}</div>}

          <div className={styles.converterControls}>
            <button
              className={styles.resetButton}
              onClick={resetToDefaults}
            >
              Reset Defaults
            </button>
          </div>

          <div className={styles.editorContainer}>
            <div className={styles.editorPanel}>
              <h4>CTO Model</h4>
              <div className={styles.highlightWrapper}>
                <textarea
                  ref={ctoTextareaRef}
                  value={ctoInput}
                  onChange={handleCtoChange}
                  onScroll={() => handleScroll(ctoTextareaRef, ctoDisplayRef)}
                  className={styles.highlightInput}
                  placeholder="Enter CTO model..."
                  spellCheck="false"
                />
                <pre
                  ref={ctoDisplayRef}
                  className={styles.highlightDisplay}
                  dangerouslySetInnerHTML={{ __html: highlightCTO(ctoInput) || '<span class="syntax-placeholder">Enter CTO model...</span>' }}
                />
              </div>
              <button
                className={styles.convertButton}
                onClick={convertCtoToMetamodel}
              >
                Parse to Metamodel
              </button>
            </div>

            <div className={styles.editorPanel}>
              <h4>Metamodel JSON</h4>
              <div className={styles.highlightWrapper}>
                <textarea
                  ref={jsonTextareaRef}
                  value={metamodelInput}
                  onChange={handleMetamodelChange}
                  onScroll={() => handleScroll(jsonTextareaRef, jsonDisplayRef)}
                  className={styles.highlightInput}
                  placeholder="Enter metamodel JSON..."
                  spellCheck="false"
                />
                <pre
                  ref={jsonDisplayRef}
                  className={styles.highlightDisplay}
                  dangerouslySetInnerHTML={{ __html: highlightJSON(metamodelInput) || '<span class="syntax-placeholder">Enter metamodel JSON...</span>' }}
                />
              </div>
              <div style={{ padding: '0.5rem 1rem', borderTop: '1px solid var(--ifm-color-emphasis-200)', fontSize: '0.85rem' }}>
                {validateJSON(metamodelInput) && metamodelInput.trim() && (
                  <span className={styles.valid}>✓ Valid JSON</span>
                )}
                {!validateJSON(metamodelInput) && metamodelInput.trim() && (
                  <span className={styles.invalid}>✗ Invalid JSON</span>
                )}
              </div>
              <button
                className={styles.convertButton}
                onClick={convertMetamodelToCto}
              >
                Print to CTO
              </button>
            </div>
          </div>

          <div className={styles.examplesSection}>
            <h4>Examples to Try</h4>

            <div className={styles.exampleCard}>
              <h5>Simple Concept</h5>
              <details>
                <summary>View Example</summary>
                <div className={styles.exampleContent}>
                  <div className={styles.exampleHalf}>
                    <strong>CTO:</strong>
                    <pre>
{`namespace shop@1.0.0

concept Product {
  o String name
  o Number price
}`}
                    </pre>
                  </div>
                  <div className={styles.exampleHalf}>
                    <strong>Metamodel:</strong>
                    <pre>
{`{
  "$class": "concerto.metamodel@1.0.0.Model",
  "namespace": "shop@1.0.0",
  "declarations": [
    {
      "$class": "concerto.metamodel@1.0.0.ConceptDeclaration",
      "name": "Product",
      "properties": [
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "name"
        },
        {
          "$class": "concerto.metamodel@1.0.0.NumberProperty",
          "name": "price"
        }
      ]
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </details>
            </div>

            <div className={styles.exampleCard}>
              <h5>Enumeration</h5>
              <details>
                <summary>View Example</summary>
                <div className={styles.exampleContent}>
                  <div className={styles.exampleHalf}>
                    <strong>CTO:</strong>
                    <pre>
{`namespace order@1.0.0

enum Status {
  o PENDING
  o SHIPPED
  o DELIVERED
}`}
                    </pre>
                  </div>
                  <div className={styles.exampleHalf}>
                    <strong>Metamodel:</strong>
                    <pre>
{`{
  "$class": "concerto.metamodel@1.0.0.Model",
  "namespace": "order@1.0.0",
  "declarations": [
    {
      "$class": "concerto.metamodel@1.0.0.EnumDeclaration",
      "name": "Status",
      "properties": [
        {
          "$class": "concerto.metamodel@1.0.0.EnumValueDeclaration",
          "name": "PENDING"
        },
        {
          "$class": "concerto.metamodel@1.0.0.EnumValueDeclaration",
          "name": "SHIPPED"
        },
        {
          "$class": "concerto.metamodel@1.0.0.EnumValueDeclaration",
          "name": "DELIVERED"
        }
      ]
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </details>
            </div>

            <div className={styles.exampleCard}>
              <h5>Optional and Array Properties</h5>
              <details>
                <summary>View Example</summary>
                <div className={styles.exampleContent}>
                  <div className={styles.exampleHalf}>
                    <strong>CTO:</strong>
                    <pre>
{`namespace contact@1.0.0

concept Person {
  o String name
  o String[] emails
  o String phone optional
}`}
                    </pre>
                  </div>
                  <div className={styles.exampleHalf}>
                    <strong>Metamodel:</strong>
                    <pre>
{`{
  "$class": "concerto.metamodel@1.0.0.Model",
  "namespace": "contact@1.0.0",
  "declarations": [
    {
      "$class": "concerto.metamodel@1.0.0.ConceptDeclaration",
      "name": "Person",
      "properties": [
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "name"
        },
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "emails",
          "isArray": true
        },
        {
          "$class": "concerto.metamodel@1.0.0.StringProperty",
          "name": "phone",
          "isOptional": true
        }
      ]
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
              </details>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}
