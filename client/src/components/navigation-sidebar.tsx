import { ScrollArea } from "@/components/ui/scroll-area";
import { tractatusContent } from "@shared/tractatus-content";

// Dictionary entries for navigation
const dictionaryEntries = [
  { term: "Algorithm", id: "algorithm" },
  { term: "Ambiguity vs. indexicality", id: "ambiguity-vs-indexicality" },
  { term: "Ambiguity vs. vagueness", id: "ambiguity-vs-vagueness" },
  { term: "Analytic truth", id: "analytic-truth" },
  { term: "Antecedent and consequent", id: "antecedent-and-consequent" },
  { term: "Atomic proposition", id: "atomic-proposition" },
  { term: "A priori", id: "a-priori" },
  { term: "A posteriori", id: "a-posteriori" },
  { term: "Axiom", id: "axiom" },
  { term: "Axiom (second definition)", id: "axiom-second-definition" },
  { term: "The axiom of comprehension", id: "axiom-of-comprehension" },
  { term: "Axiom of extensionality", id: "axiom-of-extensionality" },
  { term: "Axiomatic system", id: "axiomatic-system" },
  { term: "Axiomatization", id: "axiomatization" },
  { term: "Backtracking counterfactual", id: "backtracking-counterfactual" },
  { term: "Bound variable", id: "bound-variable" },
  { term: "Causal law", id: "causal-law" },
  { term: "Causal inference", id: "causal-inference" },
  { term: "Causal series", id: "causal-series" },
  { term: "Class", id: "class" },
  { term: "Coherence and incoherence", id: "coherence-and-incoherence" },
  { term: "Ceteris paribus", id: "ceteris-paribus" },
  { term: "Coherently conceivable circumstance", id: "coherently-conceivable-circumstance" },
  { term: "Compatibilism", id: "compatibilism" },
  { term: "Compatible", id: "compatible" },
  { term: "Complex expressions vs. simple expressions", id: "complex-vs-simple-expressions" },
  { term: "Compositionality", id: "compositionality" },
  { term: "Conceptual role semantics (CRS)", id: "conceptual-role-semantics" },
  { term: "Conditional", id: "conditional" },
  { term: "Conjunction", id: "conjunction" },
  { term: "Connective", id: "connective" },
  { term: "Content", id: "content" },
  { term: "Contingent", id: "contingent" },
  { term: "Counterfactual", id: "counterfactual" },
  { term: "Counterfactual analysis of causality", id: "counterfactual-analysis-causality" },
  { term: "Defeasible", id: "defeasible" },
  { term: "Define/definition", id: "define-definition" },
  { term: "Definition by abstraction", id: "definition-by-abstraction" },
  { term: "Denotative vs. ostensive vs. descriptive vs. contextual definition", id: "denotative-ostensive-descriptive-contextual" },
  { term: "Determinism", id: "determinism" },
  { term: "Disjunction", id: "disjunction" },
  { term: "Empirical knowledge", id: "empirical-knowledge" },
  { term: "Empirical truth", id: "empirical-truth" },
  { term: "Entailment", id: "entailment" },
  { term: "Equinumerosity", id: "equinumerosity" },
  { term: "Essence", id: "essence" },
  { term: "Existential generalization", id: "existential-generalization" },
  { term: "Existential instantiation", id: "existential-instantiation" },
  { term: "Extension vs. intension", id: "extension-vs-intension" },
  { term: "Fact", id: "fact" },
  { term: "Fallacy", id: "fallacy" },
  { term: "Formal vs. natural language", id: "formal-vs-natural-language" },
  { term: "Free variable", id: "free-variable" },
  { term: "Function", id: "function" },
  { term: "Generalization", id: "generalization" },
  { term: "Gödel's incompleteness theorems", id: "godels-incompleteness-theorems" },
  { term: "Identity", id: "identity" },
  { term: "Implication", id: "implication" },
  { term: "Incompatible", id: "incompatible" },
  { term: "Inconsistent", id: "inconsistent" },
  { term: "Independence", id: "independence" },
  { term: "Indexical", id: "indexical" },
  { term: "Inference", id: "inference" },
  { term: "Inference rule", id: "inference-rule" },
  { term: "Interpretation", id: "interpretation" },
  { term: "Logical equivalence", id: "logical-equivalence" },
  { term: "Logical form", id: "logical-form" },
  { term: "Logical truth", id: "logical-truth" },
  { term: "Material conditional", id: "material-conditional" },
  { term: "Meaning vs. entailment-relations", id: "meaning-vs-entailment-relations" },
  { term: "Modal logic", id: "modal-logic" },
  { term: "Molecular proposition", id: "molecular-proposition" },
  { term: "Necessary truth", id: "necessary-truth" },
  { term: "Negation", id: "negation" },
  { term: "Open-sentences", id: "open-sentences" },
  { term: "Paradox", id: "paradox" },
  { term: "Possible worlds", id: "possible-worlds" },
  { term: "Predicate logic", id: "predicate-logic" },
  { term: "Premise", id: "premise" },
  { term: "Property", id: "property" },
  { term: "Proposition", id: "proposition" },
  { term: "Propositional logic", id: "propositional-logic" },
  { term: "Quantifier", id: "quantifier" },
  { term: "Reference", id: "reference" },
  { term: "Rigid designator", id: "rigid-designator" },
  { term: "Russell's paradox", id: "russells-paradox" },
  { term: "Satisfiable", id: "satisfiable" },
  { term: "Scope", id: "scope" },
  { term: "Semantic", id: "semantic" },
  { term: "Set", id: "set" },
  { term: "Sound", id: "sound" },
  { term: "Speech act", id: "speech-act" },
  { term: "Surd", id: "surd" },
  { term: "Supervenience", id: "supervenience" },
  { term: "Syntax", id: "syntax" },
  { term: "Tautology/truism", id: "tautology-truism" },
  { term: "Theory of Descriptions", id: "theory-of-descriptions" },
  { term: "Truth", id: "truth" },
  { term: "Truth-value", id: "truth-value" },
  { term: "Universal generalization", id: "universal-generalization" },
  { term: "Valid", id: "valid" },
  { term: "Virtue theory", id: "virtue-theory" }
];

export default function NavigationSidebar() {
  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="w-64 bg-card shadow-sm border-r border-border sticky top-16 h-[calc(100vh-280px)]">
      <div className="p-4 h-full flex flex-col">
        <h3 className="font-inter font-semibold text-sm text-foreground mb-3 flex-shrink-0">
          Dictionary Navigation
        </h3>
        <ScrollArea className="flex-1 h-full">
          <div className="pr-4">
            <nav className="space-y-1">
              {dictionaryEntries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => handleNavClick(entry.id)}
                  className="block w-full text-left px-3 py-2 text-xs text-muted-foreground hover:bg-accent hover:text-primary rounded-md transition-colors"
                >
                  {entry.term}
                </button>
              ))}
            </nav>
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
