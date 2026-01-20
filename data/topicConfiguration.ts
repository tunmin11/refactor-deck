import { Topic } from "../types";

interface CodeSnippetPair {
  initial: string;
  solution: string;
}

export const FALLBACK_SNIPPET: CodeSnippetPair = {
  initial: `// Code implementation varies based on context.
// See solution for best practices.`,
  solution: `// Best practice implementation
class Example {
  execute() {
    console.log("Clean Code Applied");
  }
}`
};

export const TOPIC_CODE_SNIPPETS: Record<Topic, CodeSnippetPair> = {
  [Topic.REACT_PATTERNS]: {
    initial: `// ❌ Prop Drilling (Bad)
const Parent = () => {
  const [user, setUser] = useState(null);
  return <Child user={user} />;
};

const Child = ({ user }) => <GrandChild user={user} />;`,
    solution: `// ✅ Context API / Composition (Good)
const UserContext = createContext();

const Parent = () => {
  return (
    <UserContext.Provider value={user}>
       <Child />
    </UserContext.Provider>
  );
};`
  },
  [Topic.ANGULAR]: {
    initial: `// ❌ RxJS for synchronous state
count$ = new BehaviorSubject(0);

increment() {
  this.count$.next(this.count$.value + 1);
}`,
    solution: `// ✅ Angular Signals (Modern)
count = signal(0);

increment() {
  this.count.update(c => c + 1);
}`
  },
  [Topic.TYPESCRIPT]: {
    initial: `// ❌ Using 'any' loses type safety
function processData(data: any) {
  return data.value; 
}`,
    solution: `// ✅ Generics preserve types
function processData<T>(data: T): T {
  return data;
}`
  },
  // Add defaults for other topics to avoid undefined errors if strictly typed
  [Topic.CLEAN_CODE]: FALLBACK_SNIPPET,
  [Topic.DESIGN_PATTERNS]: FALLBACK_SNIPPET,
  [Topic.REFACTORING]: FALLBACK_SNIPPET,
  [Topic.ARCHITECTURE]: FALLBACK_SNIPPET,
  [Topic.SOLID]: FALLBACK_SNIPPET,
};

export const TOPIC_KEYWORDS: Record<Topic, string[]> = {
  [Topic.CLEAN_CODE]: ['clean code', 'principles', 'smell', 'career'],
  [Topic.DESIGN_PATTERNS]: ['design patterns', 'creational', 'structural', 'behavioral', 'singleton', 'factory', 'observer', 'strategy', 'adapter', 'facade', 'proxy', 'command'],
  [Topic.REFACTORING]: ['refactoring', 'clean code', 'smell'],
  [Topic.ARCHITECTURE]: ['architecture', 'di', 'clean', 'layer'],
  [Topic.SOLID]: ['solid', 'srp', 'ocp', 'lsp', 'isp', 'dip'],
  [Topic.REACT_PATTERNS]: ['react'],
  [Topic.ANGULAR]: ['angular', 'rxjs', 'signals'],
  [Topic.TYPESCRIPT]: ['typescript', 'generics', 'types'],
};