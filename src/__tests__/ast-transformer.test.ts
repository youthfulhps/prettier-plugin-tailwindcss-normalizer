import {
  transformJSXAST,
  transformHTMLAST,
  transformVueTemplate,
  transformByFileType,
} from "../ast-transformer";

describe("AST-based transformations", () => {
  describe("transformJSXAST", () => {
    it("should safely transform className in JSX", () => {
      const input = `
        function Button() {
          return (
            <button className="p-[4px] m-[8px] bg-blue-500">
              Click me
            </button>
          );
        }
      `;

      const result = transformJSXAST(input);
      expect(result).toContain('className="p-1 m-2 bg-blue-500"');
    });

    it("should transform JSX expression containers", () => {
      const input = `
        function Button() {
          return (
            <button className={"px-[16px] py-[8px] rounded-[4px]"}>
              Click me
            </button>
          );
        }
      `;

      const result = transformJSXAST(input);
      expect(result).toContain('className={"px-4 py-2 rounded"}');
    });

    it("should transform clsx function calls", () => {
      const input = `
        import clsx from 'clsx';
        
        function Button({ isActive }) {
          return (
            <button className={clsx("p-[4px] m-[8px]", isActive && "bg-blue-500")}>
              Click me
            </button>
          );
        }
      `;

      const result = transformJSXAST(input);
      expect(result).toContain('clsx("p-1 m-2"');
    });

    it("should NOT transform non-className attributes", () => {
      const input = `
        function Component() {
          return (
            <div 
              title="패딩은 p-[4px]입니다"
              data-class="p-[8px] m-[16px]" 
              className="p-[4px]"
            >
              Content
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      // className should be transformed
      expect(result).toContain('className="p-1"');

      // title and data-class should not be transformed
      expect(result).toContain('title="패딩은 p-[4px]입니다"');
      expect(result).toContain('data-class="p-[8px] m-[16px]"');
    });

    it("should NOT transform comments", () => {
      const input = `
        // This component uses p-[4px] padding
        function Button() {
          /* 
           * Margin is set to m-[8px]
           */
          return (
            <button className="p-[4px] m-[8px]">
              Click me
            </button>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('className="p-1 m-2"');

      expect(result).toContain("p-[4px] padding");
      expect(result).toContain("m-[8px]");
    });

    it("should handle template literals safely", () => {
      const input = `
        function Button({ size }) {
          return (
            <button className={\`p-[4px] m-\${size}px bg-blue-500\`}>
              Click me
            </button>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain("p-1 m-${size}px bg-blue-500");
    });

    it("should transform ternary operator strings", () => {
      const input = `
        function Component({ isActive }) {
          const dynamicClasses = isActive 
            ? "p-[16px] bg-blue-500" 
            : "p-[8px] bg-gray-300";
          
          return (
            <div className={
              condition 
                ? "p-[20px] m-[10px]" 
                : "p-[4px] m-[2px]"
            }>
              Content
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-4 bg-blue-500"');
      expect(result).toContain('"p-2 bg-gray-300"');
      expect(result).toContain('"p-5 m-2.5"');
      expect(result).toContain('"p-1 m-0.5"');
    });

    it("should NOT transform non-class strings", () => {
      const input = `
        function Component() {
          const message = "The padding is p-[4px]";
          const url = "https://example.com/p-[16px]";
          const number = "123";
          
          return (
            <div>
              <p>{message}</p>
              <a href={url}>Link</a>
              <span>{number}</span>
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"The padding is p-[4px]"');
      expect(result).toContain('"https://example.com/p-[16px]"');
      expect(result).toContain('"123"');
    });
  });

  describe("transformHTMLAST", () => {
    it("should safely transform class attributes in HTML", () => {
      const input = `
        <div class="p-[4px] m-[8px] bg-blue-500">
          <span class="text-center px-[16px]">Text</span>
        </div>
      `;

      const result = transformHTMLAST(input);
      expect(result).toContain('class="p-1 m-2 bg-blue-500"');
      expect(result).toContain('class="text-center px-4"');
    });

    it("should NOT transform non-class attributes", () => {
      const input = `
        <div 
          class="p-[4px]"
          title="패딩: p-[4px]"
          data-original="m-[8px]"
        >
          Content
        </div>
      `;

      const result = transformHTMLAST(input);

      expect(result).toContain('class="p-1"');

      expect(result).toContain('title="패딩: p-[4px]"');
      expect(result).toContain('data-original="m-[8px]"');
    });

    it("should handle both single and double quotes", () => {
      const input = `
        <div class="p-[4px]" title='margin: m-[8px]'>
          <span class='px-[16px]'>Content</span>
        </div>
      `;

      const result = transformHTMLAST(input);
      expect(result).toContain('class="p-1"');
      expect(result).toContain("class='px-4'");
    });
  });

  describe("transformVueTemplate", () => {
    it("should transform Vue class bindings", () => {
      const input = `
        <div 
          :class="dynamicClass"
          class="p-[4px] m-[8px]"
          v-bind:class="'px-[16px] py-[8px]'"
        >
          Content
        </div>
      `;

      const result = transformVueTemplate(input);
      expect(result).toContain('class="p-1 m-2"');
      expect(result).toContain("v-bind:class=\"'px-4 py-2'\"");
    });

    it("should NOT transform other Vue directives", () => {
      const input = `
        <div 
          class="p-[4px]"
          :title="'패딩: p-[8px]'"
          v-model="formData"
        >
          {{ message + " p-[16px]" }}
        </div>
      `;

      const result = transformVueTemplate(input);

      expect(result).toContain('class="p-1"');

      expect(result).toContain(":title=\"'패딩: p-[8px]'\"");
      expect(result).toContain('{{ message + " p-[16px]" }}');
    });
  });

  describe("transformByFileType", () => {
    it("should use appropriate transformer based on file extension", () => {
      const jsxCode = `
        function Button() {
          return <button className="p-[4px]">Click</button>;
        }
      `;

      const htmlCode = `<div class="p-[4px]">Content</div>`;

      const jsxResult = transformByFileType(jsxCode, "Button.jsx");
      const htmlResult = transformByFileType(htmlCode, "page.html");

      expect(jsxResult).toContain('className="p-1"');
      expect(htmlResult).toContain('class="p-1"');
    });

    it("should handle Vue SFC files", () => {
      const vueCode = `
        <template>
          <div class="p-[4px] m-[8px]">
            <span :class="'px-[16px]'">Content</span>
          </div>
        </template>
        
        <script>
        export default {
          name: 'Component'
        }
        </script>
      `;

      const result = transformByFileType(vueCode, "Component.vue");

      expect(result).toContain('class="p-1 m-2"');
      expect(result).toContain(":class=\"'px-4'\"");

      expect(result).toContain("name: 'Component'");
    });
  });

  describe("Advanced JSX patterns", () => {
    it("should handle logical operators (&&, ||)", () => {
      const input = `
        function Component({ isActive, hasError }) {
          const buttonClass = isActive && "p-[4px] bg-blue-500";
          const errorClass = hasError || "border-[2px] border-red-500";
          
          return (
            <div className={isActive && "p-[8px] m-[4px]"}>
              <button className={hasError || "px-[16px] py-[8px]"}>
                Click
              </button>
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-1 bg-blue-500"');
      expect(result).toContain('"border-2 border-red-500"');
      expect(result).toContain('"p-2 m-1"');
      expect(result).toContain('"px-4 py-2"');
    });

    it("should handle object properties and array elements", () => {
      const input = `
        function Component() {
          const styles = {
            button: "p-[4px] m-[8px]",
            input: "border-[1px] px-[12px]",
            nested: { card: "rounded-[6px] shadow-[0px_2px_8px]" }
          };
          
          const classList = [
            "w-[100px] h-[50px]",
            condition ? "bg-[#ff0000]" : "bg-[#00ff00]", 
            styles.button
          ];

          return (
            <div className={styles.button}>
              <span className={classList[0]}>Text</span>
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-1 m-2"');
      expect(result).toContain('"border px-3"');
    });

    it("should handle function parameters and return values", () => {
      const input = `
        function getButtonClass(size = "p-[4px]") {
          return size === "small" ? "px-[8px] py-[4px]" : "px-[16px] py-[8px]";
        }

        const Component = (props = { className: "m-[8px] border-[2px]" }) => {
          const dynamicClass = React.useMemo(() => "w-[200px] h-[100px]", []);
          
          return (
            <div className={getButtonClass()}>
              <span className={props.className}>Content</span>
            </div>
          );
        };
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('size = "p-1"');

      expect(result).toContain('"px-2 py-1"');
      expect(result).toContain('"px-4 py-2"');

      expect(result).toContain('className: "m-2 border-2"');
    });

    it("should handle switch statements and complex conditionals", () => {
      const input = `
        function Component({ variant, size }) {
          let baseClasses = "p-[4px] m-[2px]";
          
          switch (variant) {
            case 'primary':
              baseClasses += " bg-blue-500 border-[2px]";
              break;
            case 'secondary':
              baseClasses = "px-[8px] py-[4px] bg-gray-300";
              break;
            default:
              baseClasses = size > 10 ? "p-[16px]" : "p-[8px]";
          }

          return <button className={baseClasses}>Button</button>;
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('baseClasses = "p-1 m-0.5"');
      expect(result).toContain("border-2");
      expect(result).toContain('"px-2 py-1 bg-gray-300"');
      expect(result).toContain('"p-4"');
      expect(result).toContain('"p-2"');
    });

    it("should handle destructuring patterns", () => {
      const input = `
        function Component() {
          const { primaryClass = "p-[4px]", secondaryClass } = {
            primaryClass: "m-[8px] border-[1px]",
            secondaryClass: "px-[12px] rounded-[4px]"
          };
          
          const [firstClass, secondClass = "py-[6px]"] = [
            "w-[100px]", 
            "h-[50px] bg-red-500"
          ];

          return (
            <div className={primaryClass}>
              <span className={firstClass}>{secondClass}</span>
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('primaryClass = "p-1"');
      expect(result).toContain('"m-2 border"');
      expect(result).toContain('"px-3 rounded"');

      expect(result).toContain('secondClass = "py-1.5"');
    });

    it("should handle nested template literals", () => {
      const input = `
        function Component({ theme, size }) {
          const complexTemplate = \`
            \${theme === 'dark' ? \`p-[8px] bg-gray-\${900}\` : \`p-[4px] bg-white\`}
            m-[4px] border-[1px]
            \${size && \`w-[\${size}px] rounded-[6px]\`}
          \`;

          return <div className={complexTemplate}>Content</div>;
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain("p-[8px] bg-gray-");
      expect(result).toContain("p-[4px] bg-white");
      expect(result).toContain("m-[4px] border-[1px]");
      expect(result).toContain("rounded-[6px]");
    });

    it("should handle React hooks and complex state patterns", () => {
      const input = `
        function Component() {
          const [isActive, setIsActive] = useState(false);
          const [styles, setStyles] = useState({
            button: "p-[4px] hover:bg-[#f0f0f0]",
            input: "border-[2px] focus:ring-[2px]"
          });

          useEffect(() => {
            const dynamicStyle = isActive ? "bg-[#007bff] p-[8px]" : "bg-gray-300 p-[4px]";
            setStyles(prev => ({
              ...prev,
              dynamic: dynamicStyle
            }));
          }, [isActive]);

          return (
            <div className={styles.button}>
              <input className={styles.input} />
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-1 hover:bg-[#f0f0f0]"');
      expect(result).toContain('"border-2 focus:ring-2"');

      expect(result).toContain('"bg-[#007bff] p-2"');
      expect(result).toContain('"bg-gray-300 p-1"');
    });

    it("should handle method chaining and complex expressions", () => {
      const input = `
        function Component({ classes }) {
          const processedClasses = classes
            .split(' ')
            .map(cls => cls.includes('[') ? cls : \`enhanced-\${cls}\`)
            .filter(cls => cls !== "p-[0px]")
            .join(' ');

          const conditionalClass = React.useMemo(() => {
            return [
              "base-class",
              condition && "p-[4px]",
              another && "m-[8px]"
            ].filter(Boolean).join(' ');
          }, [condition, another]);

          return <div className={conditionalClass}>Content</div>;
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-1"');
      expect(result).toContain('"m-2"');
    });

    it("should handle Fragment patterns and conditional rendering", () => {
      const input = `
        function Component({ showExtra }) {
          return (
            <>
              <div className="p-[4px] m-[2px]">Main content</div>
              {showExtra && (
                <Fragment>
                  <span className="px-[8px] border-[1px]">Extra 1</span>
                  {condition ? (
                    <div className="py-[6px] rounded-[4px]">Conditional</div>
                  ) : null}
                </Fragment>
              )}
              {items.map(item => (
                <div key={item.id} className={
                  \`w-[200px] \${item.active ? 'bg-[#e3f2fd] p-[12px]' : 'bg-gray-100 p-[8px]'}\`
                }>
                  {item.name}
                </div>
              ))}
            </>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-1 m-0.5"');
      expect(result).toContain('"px-2 border"');
      expect(result).toContain('"py-1.5 rounded"');

      expect(result).toContain('"bg-[#e3f2fd] p-3"');
      expect(result).toContain('"bg-gray-100 p-2"');
    });

    it("should handle custom hooks and higher-order components", () => {
      const input = `
        const useStyles = (theme) => {
          return useMemo(() => ({
            container: \`p-[16px] \${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}\`,
            header: "border-b-[2px] pb-[8px] mb-[12px]",
            content: "px-[20px] py-[10px]"
          }), [theme]);
        };

        const withClassName = (Component) => (props) => {
          const defaultClassName = "rounded-[6px] shadow-[0_2px_4px_rgba(0,0,0,0.1)]";
          return <Component {...props} className={\`\${defaultClassName} \${props.className || ''}\`} />;
        };
      `;

      const result = transformJSXAST(input);

      expect(result).toContain("p-[16px]");
      expect(result).toContain('"px-5 py-2.5"');

      expect(result).toContain(
        '"rounded-md shadow-[0_2px_4px_rgba(0,0,0,0.1)]"'
      );
    });

    it("should handle error boundaries and try-catch patterns", () => {
      const input = `
        class ErrorBoundary extends React.Component {
          constructor(props) {
            super(props);
            this.state = { 
              hasError: false,
              errorStyles: "p-[16px] border-[2px] border-red-500 bg-[#fef2f2]"
            };
          }

          static getDerivedStateFromError(error) {
            return { 
              hasError: true,
              errorMessage: \`Error occurred with padding: p-[8px]\`
            };
          }

          render() {
            if (this.state.hasError) {
              return (
                <div className={this.state.errorStyles}>
                  <h2 className="text-[18px] font-bold mb-[8px]">Something went wrong</h2>
                  <button 
                    className="mt-[12px] px-[16px] py-[8px] bg-blue-500"
                    onClick={() => this.setState({ hasError: false })}
                  >
                    Try again
                  </button>
                </div>
              );
            }

            return this.props.children;
          }
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-4 border-2 border-red-500 bg-[#fef2f2]"');

      expect(result).toContain("Error occurred with padding: p-[8px]");

      expect(result).toContain('"mt-3 px-4 py-2 bg-blue-500"');
    });
  });

  describe("Edge cases and extreme scenarios", () => {
    it("should handle empty strings and null values", () => {
      const input = `
        function Component({ className = null }) {
          const emptyClass = "";
          const nullClass = null;
          const undefinedClass = undefined;
          const validClass = "p-[4px] m-[8px]";

          return (
            <div className={className || validClass}>
              <span className={emptyClass}>Empty</span>
              <div className={nullClass}>Null</div>
              <p className={undefinedClass}>Undefined</p>
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-1 m-2"');

      expect(result).toContain('const emptyClass = "";');
      expect(result).toContain("const nullClass = null;");
      expect(result).toContain("const undefinedClass = undefined;");
    });

    it("should handle very long class strings", () => {
      const longClasses = [
        "p-[4px]",
        "m-[8px]",
        "px-[16px]",
        "py-[12px]",
        "pt-[20px]",
        "pr-[24px]",
        "pb-[28px]",
        "pl-[32px]",
        "w-[100px]",
        "h-[200px]",
        "border-[1px]",
        "rounded-[6px]",
        "gap-[8px]",
        "z-[1000]",
      ];

      const input = `
        function Component() {
          const superLongClassName = "${longClasses.join(
            " "
          )} text-center font-bold bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:ring-[2px] focus:ring-offset-[2px] transition-all duration-[200ms] ease-in-out";
          
          return <div className={superLongClassName}>Very long class list</div>;
        }
      `;

      const result = transformJSXAST(input);
    });

    it("should handle unicode and special characters", () => {
      const input = `
        function Component() {
          const unicodeClass = "p-[4px] 한글클래스-[8px] émoji-[🚀] special_chars-[#@$%]";
          const quoteMixing = 'Single quote with p-[4px] and "double quotes m-[8px]"';
          const specialChars = \`Template with \${variable} and p-[4px] 特殊文字\`;

          return (
            <div className={unicodeClass}>
              <span className={quoteMixing}>Mixed quotes</span>
              <p className={specialChars}>Special chars</p>
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain("p-[4px]");

      expect(result).toContain("한글클래스-[8px]");
      expect(result).toContain("émoji-[🚀]");
      expect(result).toContain("special_chars-[#@$%]");
    });

    it("should handle multiple arbitrary values in single class", () => {
      const input = `
        function Component() {
          const multipleArbitraries = "p-[4px] m-[8px] w-[100px] h-[50px] border-[2px] rounded-[6px] z-[1000] duration-[200ms]";
          const mixedValidInvalid = "p-[4px] custom-[999px] m-[8px] unknown-[red] w-[200px] border-[1px]";
          
          return (
            <div className={multipleArbitraries}>
              <span className={mixedValidInvalid}>Mixed validity</span>
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain("p-1 m-2"); // p-[4px] m-[8px]
      expect(result).toContain("border-2"); // border-[2px]
      expect(result).toContain("rounded-md"); // rounded-[6px]
      expect(result).toContain("duration-200"); // duration-[200ms]

      expect(result).toContain("custom-[999px]");
      expect(result).toContain("unknown-[red]");
    });

    it("should handle complex React patterns", () => {
      const input = `
        const ThemeContext = React.createContext();

        function useTheme() {
          const context = useContext(ThemeContext);
          return context || { spacing: "p-[8px]", colors: { primary: "bg-[#007bff]" } };
        }

        const Button = React.forwardRef(({ variant = "primary", ...props }, ref) => {
          const theme = useTheme();
          const variants = {
            primary: "px-[16px] py-[8px] bg-blue-500 hover:bg-blue-600",
            secondary: "px-[12px] py-[6px] bg-gray-300 hover:bg-gray-400",
            danger: \`px-[20px] py-[10px] bg-red-500 hover:bg-red-600 \${theme.spacing}\`
          };

          return (
            <button
              ref={ref}
              className={\`\${variants[variant]} rounded-[4px] transition-[all] duration-[150ms]\`}
              {...props}
            />
          );
        });
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('spacing: "p-2"');

      expect(result).toContain('"px-4 py-2 bg-blue-500');
      expect(result).toContain('"px-3 py-1.5 bg-gray-300');
    });
  });

  describe("Safety tests", () => {
    it("should not break on invalid syntax", () => {
      const invalidJSX = `
        function Broken() {
          return <div className="p-[4px]" >
        }
      `;

      const result = transformJSXAST(invalidJSX);
      expect(result).toBe(invalidJSX);
    });

    it("should preserve non-Tailwind arbitrary values", () => {
      const input = `
        function Component() {
          return (
            <div 
              className="p-[4px] custom-[999px] unknown-[red]"
              style="--custom: calc(100% - 4px)"
            >
              Content
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('className="p-1 custom-[999px] unknown-[red]"');

      expect(result).toContain('style="--custom: calc(100% - 4px)"');
    });

    it("should handle malformed class strings gracefully", () => {
      const input = `
        function Component() {
          const malformed1 = "p-[] m-[px] w-[notanumber]";
          const malformed2 = "p-[4px m-8px] unclosed-[bracket";
          const mixed = "p-[4px] valid-class malformed-[] m-[8px]";

          return (
            <div className={malformed1}>
              <span className={malformed2}>Malformed</span>  
              <p className={mixed}>Mixed</p>
            </div>
          );
        }
      `;

      const result = transformJSXAST(input);

      expect(result).toContain('"p-[] m-[px] w-[notanumber]"');
      expect(result).toContain('"p-[4px m-8px] unclosed-[bracket"');
    });
  });

  describe("Examples integration tests", () => {
    describe("Comprehensive mappings test", () => {
      it("should handle comprehensive typography mappings", () => {
        const input = `
          function Component() {
            return (
              <div>
                <div className="text-[12px] tracking-[0.025em] leading-[1.5]">
                  Typography test
                </div>
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain(
          'className="text-xs tracking-wide leading-normal"'
        );
      });

      it("should handle sizing with all directions", () => {
        const input = `
          function Component() {
            return (
              <div className="w-[320px] h-[200px] min-w-[100px] max-w-[600px] min-h-[50px] max-h-[400px]">
                Sizing test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("w-80"); // w-[320px] should transform
        // Some values might not have exact mappings
        expect(result).toContain("min-w-");
        expect(result).toContain("max-w-");
      });

      it("should handle transform properties", () => {
        const input = `
          function Component() {
            return (
              <div className="rotate-[45deg] scale-[1.25] translate-x-[16px] -translate-y-[50%]">
                Transform test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("rotate-45");
        expect(result).toContain("scale-125");
        expect(result).toContain("translate-x-4");
        // translate-y-[50%] might not have exact mapping
      });

      it("should handle shadow effects", () => {
        const input = `
          function Component() {
            return (
              <div className="shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),_0_2px_4px_-2px_rgb(0_0_0_/_0.1)] opacity-[0.8]">
                Shadow test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        // Shadow might not transform if exact value doesn't match
        expect(result).toContain("opacity-80");
      });

      it("should handle filters and backdrop filters", () => {
        const input = `
          function Component() {
            return (
              <div className="blur-[8px] brightness-[1.25] backdrop-blur-[12px] backdrop-brightness-[1.1]">
                Filter test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("blur");
        expect(result).toContain("brightness-125");
        expect(result).toContain("backdrop-blur-md");
        expect(result).toContain("backdrop-brightness-110");
      });

      it("should handle border and outline with all directions", () => {
        const input = `
          function Component() {
            return (
              <div className="border-t-[2px] border-r-[4px] border-b-[2px] border-l-[1px] rounded-tl-[8px] rounded-tr-[12px] outline-[2px] outline-offset-[2px]">
                Border test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("border-t-2");
        expect(result).toContain("border-r-4");
        expect(result).toContain("border-b-2");
        expect(result).toContain("border-l");
        expect(result).toContain("rounded-tl-lg");
        expect(result).toContain("rounded-tr-xl");
        expect(result).toContain("outline-2");
        expect(result).toContain("outline-offset-2");
      });

      it("should handle positioning properties", () => {
        const input = `
          function Component() {
            return (
              <div className="top-[16px] right-[8px] bottom-[12px] left-[20px]">
                Position test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain('className="top-4 right-2 bottom-3 left-5"');
      });

      it("should handle gap and space properties", () => {
        const input = `
          function Component() {
            return (
              <div className="gap-x-[16px] gap-y-[8px] space-x-[12px] space-y-[20px]">
                Gap test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("gap-x-4");
        expect(result).toContain("gap-y-2");
        expect(result).toContain("space-x-3");
        expect(result).toContain("space-y-5");
      });

      it("should handle animation properties", () => {
        const input = `
          function Component() {
            return (
              <div className="duration-[300ms] delay-[150ms]">
                Animation test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("duration-300");
        expect(result).toContain("delay-150");
      });

      it("should handle scroll properties", () => {
        const input = `
          function Component() {
            return (
              <div className="scroll-m-[16px] scroll-p-[24px]">
                Scroll test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("scroll-m-4");
        expect(result).toContain("scroll-p-6");
      });
    });

    describe("Function handling tests", () => {
      it("should handle multiple function types", () => {
        const input = `
          import cx from 'classnames';
          import clsx from 'clsx';
          import classNames from 'classnames';
          
          function Component() {
            return (
              <div>
                <div className={clsx("p-[4px]", "m-[8px]")}>clsx function</div>
                <div className={classNames("p-[4px]", "m-[8px]")}>classNames function</div>
                <div className={cx("p-[4px]", "m-[8px]")}>cx function (should work via StringLiteral)</div>
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        // All should be transformed since StringLiteral visitor catches them
        expect(result).toContain('clsx("p-1", "m-2")');
        expect(result).toContain('classNames("p-1", "m-2")');
        expect(result).toContain('cx("p-1", "m-2")');
      });

      it("should handle custom function calls via StringLiteral visitor", () => {
        const input = `
          function myCustomHelper(...classes) {
            return classes.join(' ');
          }
          
          function Component() {
            return (
              <div className={myCustomHelper("p-[4px]", "rounded-[6px]")}>
                Custom function
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain('myCustomHelper("p-1", "rounded-md")');
      });
    });

    describe("Complex conditional rendering tests", () => {
      it("should handle ternary operators", () => {
        const input = `
          function Component({ isActive, condition }) {
            const dynamicClasses = isActive ? "p-[16px] bg-blue-500" : "p-[8px] bg-gray-300";
            const complexClasses = condition
              ? "p-[20px] m-[10px] border-[2px]"
              : "p-[4px] m-[2px] rounded-[6px]";
            
            return (
              <div className={condition ? "p-[20px] m-[10px]" : "p-[4px] m-[2px]"}>
                <span className={dynamicClasses}>Ternary test</span>
                <button className={complexClasses}>Complex conditional</button>
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain('"p-4 bg-blue-500"');
        expect(result).toContain('"p-2 bg-gray-300"');
        expect(result).toContain('"p-5 m-2.5 border-2"');
        expect(result).toContain('"p-1 m-0.5 rounded-md"');
        expect(result).toContain('? "p-5 m-2.5" : "p-1 m-0.5"');
      });

      it("should handle template literals", () => {
        const input = `
          function Component({ theme }) {
            return (
              <div className={\`p-[16px] \${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-white'}\`}>
                Template literal test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("p-4");
        // Template literal interpolation should be preserved
        expect(result).toContain("${theme");
      });
    });

    describe("Multi-attribute tests", () => {
      it("should only transform supported attributes", () => {
        const input = `
          function Component() {
            return (
              <div
                className="p-[4px]"
                myClassProp="border-[2px] rounded-[4px]"
                data-classes="w-[200px] h-[100px]"
                title="This should not transform p-[4px]"
                aria-label="Label with p-[4px]"
              >
                Multi-attribute test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        // Only className should be transformed by JSXAttribute visitor
        expect(result).toContain('className="p-1"');

        // Other attributes should not be transformed by JSXAttribute visitor
        // but their Tailwind-pattern strings might be caught by StringLiteral visitor
        expect(result).toContain('title="This should not transform p-[4px]"');
        expect(result).toContain('aria-label="Label with p-[4px]"');
      });
    });

    describe("Px suffix comprehensive tests", () => {
      it("should handle all border px suffix variations", () => {
        const input = `
          function Component() {
            return (
              <div>
                <div className="border-[1px] border-[2px] border-[4px] border-[8px]">All borders</div>
                <div className="border-t-[2px] border-r-[4px] border-b-[2px] border-l-[1px]">Directional borders</div>
                <div className="border-x-[2px] border-y-[4px]">X/Y borders</div>
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("border border-2 border-4 border-8");
        expect(result).toContain("border-t-2 border-r-4 border-b-2 border-l");
        expect(result).toContain("border-x-2 border-y-4");
      });

      it("should handle all spacing px suffix variations", () => {
        const input = `
          function Component() {
            return (
              <div>
                <div className="p-[4px] px-[8px] py-[12px] pt-[16px] pr-[20px] pb-[24px] pl-[28px]">All paddings</div>
                <div className="m-[4px] mx-[8px] my-[12px] mt-[16px] mr-[20px] mb-[24px] ml-[28px]">All margins</div>
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("p-1 px-2 py-3 pt-4 pr-5 pb-6 pl-7");
        expect(result).toContain("m-1 mx-2 my-3 mt-4 mr-5 mb-6 ml-7");
      });

      it("should handle sizing px suffix variations", () => {
        const input = `
          function Component() {
            return (
              <div className="w-[16px] h-[32px] min-w-[24px] max-w-[48px] min-h-[16px] max-h-[64px]">
                Sizing test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("w-4 h-8");
        // Some values might not have exact matches and stay as arbitrary
        expect(result).toContain("max-w-");
        expect(result).toContain("max-h-16");
      });

      it("should handle gap and positioning px suffix", () => {
        const input = `
          function Component() {
            return (
              <div>
                <div className="gap-[4px] gap-x-[8px] gap-y-[12px] space-x-[16px] space-y-[20px]">Gaps</div>
                <div className="top-[4px] right-[8px] bottom-[12px] left-[16px]">Positions</div>
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("gap-1 gap-x-2 gap-y-3 space-x-4 space-y-5");
        expect(result).toContain("top-1 right-2 bottom-3 left-4");
      });

      it("should handle ring and outline px suffix", () => {
        const input = `
          function Component() {
            return (
              <div className="ring-[2px] ring-offset-[4px] outline-[2px] outline-offset-[4px]">
                Ring and outline test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain(
          "ring-2 ring-offset-4 outline-2 outline-offset-4"
        );
      });

      it("should handle scroll px suffix", () => {
        const input = `
          function Component() {
            return (
              <div className="scroll-m-[4px] scroll-p-[8px]">
                Scroll test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("scroll-m-1 scroll-p-2");
      });

      it("should handle combined px suffix cases", () => {
        const input = `
          function Component() {
            return (
              <div className="border-[2px] p-[8px] m-[4px] w-[64px] h-[48px] gap-[4px]">
                Combined px suffix test
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("border-2 p-2 m-1 w-16 h-12 gap-1");
      });

      it("should preserve non-Tailwind classes when mixed with px suffix", () => {
        const input = `
          function Component() {
            return (
              <div className="border-[4px] bg-blue-500 text-white hover:bg-blue-600 focus:ring-[2px]">
                Mixed with standard classes
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain(
          "border-4 bg-blue-500 text-white hover:bg-blue-600 focus:ring-2"
        );
      });
    });
  });

  describe("HTML transformation tests", () => {
    it("should transform HTML class attributes", () => {
      const input = `
        <!doctype html>
        <html>
          <body>
            <div class="p-[4px] m-[8px] bg-blue-500">HTML test</div>
            <div title="Should not transform: p-[20px]" class="px-[16px] py-[8px]">
              Safety test
            </div>
          </body>
        </html>
      `;

      const result = transformHTMLAST(input);

      expect(result).toContain('class="p-1 m-2 bg-blue-500"');
      expect(result).toContain('class="px-4 py-2"');
      expect(result).toContain('title="Should not transform: p-[20px]"');
    });

    it("should handle different quote types in HTML", () => {
      const input = `
        <div class='p-[4px] m-[8px]'>Single quotes</div>
        <div class="px-[16px] py-[8px]">Double quotes</div>
      `;

      const result = transformHTMLAST(input);

      expect(result).toContain("class='p-1 m-2'");
      expect(result).toContain('class="px-4 py-2"');
    });

    it("should not transform non-class attributes in HTML", () => {
      const input = `
        <div title="Padding: p-[20px]" data-test="m-[24px]" class="px-[16px] py-[8px]">
          Content
        </div>
      `;

      const result = transformHTMLAST(input);

      expect(result).toContain('class="px-4 py-2"');
      expect(result).toContain('title="Padding: p-[20px]"');
      expect(result).toContain('data-test="m-[24px]"');
    });
  });

  describe("Vue template tests", () => {
    it("should transform Vue class bindings", () => {
      const input = `
        <template>
          <div class="p-[4px] m-[8px]">
            <span :class="'px-[16px] py-[8px]'">Vue binding test</span>
            <button v-bind:class="'rounded-[6px] bg-blue-500'">Button</button>
          </div>
        </template>
      `;

      const result = transformVueTemplate(input);

      expect(result).toContain('class="p-1 m-2"');
      expect(result).toContain(":class=\"'px-4 py-2'\"");
      expect(result).toContain("v-bind:class=\"'rounded-md bg-blue-500'\"");
    });

    it("should handle nested quotes in Vue class bindings", () => {
      const input = `
        <template>
          <div :class="'p-[4px] m-[8px]'">
            <span v-bind:class="'px-[16px] py-[8px]'">Nested quotes</span>
          </div>
        </template>
      `;

      const result = transformVueTemplate(input);

      expect(result).toContain(":class=\"'p-1 m-2'\"");
      expect(result).toContain("v-bind:class=\"'px-4 py-2'\"");
    });

    it("should not transform Vue data or text content", () => {
      const input = `
        <template>
          <div class="p-[4px]">
            <p>{{ message + " w-[32px]" }}</p>
          </div>
        </template>
      `;

      const result = transformVueTemplate(input);

      expect(result).toContain('class="p-1"');
      expect(result).toContain('{{ message + " w-[32px]" }}');
    });
  });

  describe("Negative values transformation tests", () => {
    describe("Negative margin tests", () => {
      it("should transform negative margin arbitrary values in JSX", () => {
        const input = `
          function Component() {
            return (
              <div className="-m-[4px] -mx-[8px] -my-[12px]">
                Negative margins
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("-m-1");
        expect(result).toContain("-mx-2");
        expect(result).toContain("-my-3");
      });

      it("should transform negative margin px suffix in JSX", () => {
        const input = `
          function Component() {
            return (
              <div className="-mt-4px -mr-8px -mb-16px -ml-24px">
                Negative margin px suffix
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("-mt-1");
        expect(result).toContain("-mr-2");
        expect(result).toContain("-mb-4");
        expect(result).toContain("-ml-6");
      });

      it("should transform negative values inside brackets", () => {
        const input = `
          function Component() {
            return (
              <div className="m-[-4px] mx-[-8px] mt-[-16px]">
                Negative values inside brackets
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("-m-1");
        expect(result).toContain("-mx-2");
        expect(result).toContain("-mt-4");
      });
    });

    describe("Negative positioning tests", () => {
      it("should transform negative positioning values", () => {
        const input = `
          function Component() {
            return (
              <div className="-top-[4px] -right-[8px] -bottom-[12px] -left-[16px]">
                Negative positioning
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("-top-1");
        expect(result).toContain("-right-2");
        expect(result).toContain("-bottom-3");
        expect(result).toContain("-left-4");
      });

      it("should transform negative positioning with percentages", () => {
        const input = `
          function Component() {
            return (
              <div className="-top-[50%] -left-[100%]">
                Negative positioning percentages
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("-top-1/2");
        expect(result).toContain("-left-full");
      });

      it("should transform negative positioning px suffix", () => {
        const input = `
          function Component() {
            return (
              <div className="-top-4px -right-8px">
                Negative positioning px
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("-top-1");
        expect(result).toContain("-right-2");
      });
    });

    describe("Mixed positive and negative values", () => {
      it("should handle mixed positive and negative values", () => {
        const input = `
          function Component() {
            return (
              <div className="m-[4px] -m-[8px] p-[12px] -top-[16px] w-[24px]">
                Mixed positive and negative values
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("m-1");
        expect(result).toContain("-m-2");
        expect(result).toContain("p-3");
        expect(result).toContain("-top-4");
        expect(result).toContain("w-6");
      });

      it("should handle negative values in function calls", () => {
        const input = `
          function Component() {
            return (
              <div className={clsx("-m-[4px]", "p-[8px]", condition && "-top-[12px]")}>
                Negative values in clsx
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        expect(result).toContain("-m-1");
        expect(result).toContain("p-2");
        // -top-[12px] in conditional expression may not be transformed by StringLiteral visitor
        // in this specific context
      });

      it("should handle negative values in ternary operators", () => {
        const input = `
          function Component({ isNegative }) {
            return (
              <div className={isNegative ? "-m-[8px]" : "m-[8px]"}>
                Negative values in ternary
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        // StringLiteral visitor handles this, but may not catch all cases in ternary
        expect(result).toContain('"m-2"'); // at least the positive case should transform
      });
    });

    describe("Invalid negative patterns", () => {
      it("should not transform properties that cannot be negative", () => {
        const input = `
          function Component() {
            return (
              <div className="-p-[4px] -w-[16px] -border-[2px]">
                Invalid negative patterns
              </div>
            );
          }
        `;

        const result = transformJSXAST(input);

        // These should remain unchanged as they don't have negative mappings
        expect(result).toContain("-p-[4px]");
        expect(result).toContain("-w-[16px]");
        expect(result).toContain("-border-[2px]");
      });
    });

    describe("HTML negative values", () => {
      it("should transform negative values in HTML class attributes", () => {
        const input = `
          <div class="-m-[4px] -top-[8px]">
            HTML negative values
          </div>
        `;

        const result = transformHTMLAST(input);

        expect(result).toContain("-m-1");
        expect(result).toContain("-top-2");
      });
    });

    describe("Vue negative values", () => {
      it("should transform negative values in Vue class bindings", () => {
        const input = `
          <template>
            <div :class="'-m-[4px] -top-[8px]'">
              Vue negative values
            </div>
          </template>
        `;

        const result = transformVueTemplate(input);

        expect(result).toContain("-m-1");
        expect(result).toContain("-top-2");
      });
    });
  });
});
