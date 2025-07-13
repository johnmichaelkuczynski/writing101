export const tractatusContent = {
  title: "Dictionary of Analytic Philosophy",
  author: "J.-M. Kuczynski, PhD",
  sections: [
    {
      id: "fundamentals",
      title: "Fundamental Concepts",
      content: `<p class="dictionary-entry"><strong>Algorithm:</strong> A fixed procedure for carrying out a task. The rules that we learn in grade school to multiply, add, etc., multi-digit numbers are algorithms. By formalizing inferences, logicians create algorithms for determining whether, given two statements, one of them follows from the other. A problem with algorithms is that what one has to know in order to know whether a given algorithm is applicable to a given task is often much heftier than what one would have to know to carry out that task in an ad hoc manner. In this fact lies the doom of attempts to algorithmize—or, to use the more popular term—"mechanize" thought.</p>

<p class="dictionary-entry"><strong>Axiom:</strong> A statement that, in some context, is assumed to be true and therefore isn't argued for.</p>

<p class="dictionary-entry"><strong>Axiom (second definition):</strong> A statement-form that, in some context, is assumed to have a true interpretation. See "interpretation."</p>

<p class="dictionary-entry"><strong>The axiom of comprehension:</strong> This is the principle that, given any property, there is a set containing all and only those objects that have that property. There is a set containing all and only those things that are people (i.e., that have the property of being a person). There's a set containing all and only those things that are acorns (i.e., that have the property of being an acorn). And so on. The axiom of comprehension seems self-evident. But Bertrand Russell discovered that it has self-contradictory consequences and is therefore false. The set of people is not a member of itself, since no person is a set. But some sets do seem to be members of themselves. The set of sets would seem to be such a set.</p>

<p class="dictionary-entry"><strong>Axiom of extensionality:</strong> Sets are identical if and only if they have exactly the same members.</p>

<p class="dictionary-entry"><strong>Axiomatic system:</strong> The set of statements consisting of certain axioms along with the statements that follow from them. See "axiom."</p>

<p class="dictionary-entry"><strong>Axiomatization:</strong> To axiomatize a discipline is to identify a small number of propositions and a small number of inference-rules such that all of the results of that discipline follow from those propositions by means of those inference rules. An axiomatization of a discipline is what results when it is successfully axiomatized. See "inference rule."</p>`
    },
    {
      id: "language",
      title: "Language and Meaning", 
      content: `<p class="dictionary-entry"><strong>Ambiguity vs. indexicality:</strong> An ambiguous expression is one that is assigned meaning by two or more different rules. So "dumb" is ambiguous, since there are two rules that assign meaning to utterances of it. One of those rules is: given an utterance of "x is dumb," that utterance is true just in case x cannot speak. The other is: given an utterance of "x is dumb," that utterance is true just in case x is not intelligent. An "indexical" is a context-sensitive expression. For an expression to be context-sensitive is for there to be some one semantic rule that assigns different meanings (or referents) to it, depending on the context. An example of such expression would be the pronoun "I." That expression isn't ambiguous. Some one semantic rule assigns meaning to any two tokens of it. (That rule is: given any token t of "I," t refers to the person who produced t.) But, that rule being what it is, different tokens of "I" refer to different people.</p>

<p class="dictionary-entry"><strong>Ambiguity vs. vagueness:</strong> Whereas an expression is ambiguous if it is assigned meaning by more than one semantic rule, an expression is "vague" if, supposing it unambiguous, it is assigned meaning by no well-defined semantic rule, and if, supposing it ambiguous, one of its disambiguations is assigned meaning by no well-defined semantic rule. Someone with zero hairs is definitely "bald," and someone with a million hairs (provided that they're suitably located and have the requisite thickness) definitely is "not bald." But there are many people with an intermediate number of hairs with respect to whom neither "bald" nor "not bald" is clearly applicable. Since, therefore, the semantics of "bald" is given by a rule that is undefined for these intermediate cases, "bald" is vague. Like many other expressions, the word "dumb" is both vague and ambiguous, since it is assigned meaning by two distinct semantic rules, neither one of which is entirely determinate.</p>

<p class="dictionary-entry"><strong>Analytic truth:</strong> "Squares have four sides" is analytic, since it makes no sense to suppose that squares might fail to have four sides. "Anything that is literate is animate" is analytic since it makes no sense to suppose that anything inanimate should be literate. In general, a statement is analytically true if its negation is incoherent. See "coherent," "empirical truth," "entailment," and "meaning vs. entailment-relations."</p>

<p class="dictionary-entry"><strong>Antecedent and consequent:</strong> In if P, then Q, P is the antecedent and Q is the consequent. So in if snow is cold, then snow is not hot, the statement snow is cold is the antecedent, and snow is not hot is the consequent. See "conditional."</p>`
    },
    {
      id: "logic",
      title: "Logic and Inference",
      content: `<p class="dictionary-entry"><strong>Atomic proposition:</strong> A proposition that isn't molecular (e.g., John snores). An atomic sentence is a sentence that expresses such a proposition (e.g., "John snores"). See "molecular proposition."</p>

<p class="dictionary-entry"><strong>Causal law:</strong> A law to the effect that, if one thing occurs (e.g., fire), some other thing must occur (e.g., smoke).</p>

<p class="dictionary-entry"><strong>Causal inference:</strong> An inference based on knowledge of a causal law (e.g., I see smoke; I know that there is smoke only if there is fire; so I infer that there is, or was, a fire).</p>

<p class="dictionary-entry"><strong>Causal series:</strong> A series of events such that, given any two of them, one is the (in)direct cause of the other; in other words, a single series of events any one of which is (in)directly caused by some one state of affairs. Like all series, causal series don't branch. This is a tautology. A 'series' is defined to be a non-branching structure. Of course, just a river can fork, so a causal series can branch out. In fact, the forking of a river is a special cause of the branching out of a causal series. But for a river to fork is for it to become two rivers (supposing that the two tributaries don't later merge). It isn't for a river to become two independent streams of water. Similarly, for a causal series to branch is for it to become multiple series. It is not for a series to comprise independent tributaries.</p>

<p class="dictionary-entry"><strong>Coherence and incoherence:</strong> An "incoherent" statement is one that undermines itself. Consider the statement: "Bill has four cars, but he doesn't have more than one car." This is self-defeating. Its own meaning prevents it from being true. Therefore it is "incoherent." It's clear that any statement to the effect that someone had four cars while having no more than one car would be incoherent. So the concept of such a person is one that couldn't be actualized; and any statement to the effect that it was actualized would be incoherent. Such concepts are described as "incoherent." (In this context, the term "concept" is synonymous with the term "condition," and the expression "to actualize a concept" is synonymous with the expression "to fulfill a condition.") Concepts are conditions. To actualize a concept is to fulfill a condition.</p>`
    },
    {
      id: "knowledge",
      title: "Knowledge and Belief",
      content: `<p class="dictionary-entry"><strong>A priori:</strong> Knowledge is a priori if one has it, not in virtue of any observations that one has made, but in virtue of one's innate cognitive structure of one's mind. See "empirical knowledge."</p>

<p class="dictionary-entry"><strong>A posteriori:</strong> Knowledge is a posteriori if it isn't a priori. See "A priori."</p>

<p class="dictionary-entry"><strong>Coherently conceivable circumstance (or scenario):</strong> A circumstance is coherently conceivable just in case one is not guilty of self-contradiction in virtue of believing it to hold. So even though Kerry is not the U.S. President in 2007, the proposition Kerry is U.S. President in 2007 is not self-undermining—it isn't like x is knowledge but not belief or 1 + 1 = 3. So while all beliefs requiring the existence of circumstances that are not coherently conceivable are false, not all false beliefs require the existence of such circumstances. See "coherence and incoherence."</p>

<p class="dictionary-entry"><strong>"Ceteris paribus":</strong> Synonymous with "other things being equal" and "holding all other factors constant." Ceteris paribus, a person with money is more likely to be happy than a person with no money. In other words, given two otherwise comparable people, one of whom has money, the other of whom does not, the former is more likely to be happy than the latter. But if the former has a painful chronic illness and his dreams have been all been shattered (etc.) whereas the former is in the pink of health and he feels himself to be on the cusp of success, the latter will probably be happier than the former.</p>`
    },
    {
      id: "mathematics", 
      title: "Mathematics and Formal Systems",
      content: `<p class="dictionary-entry"><strong>Class:</strong> Synonymous (in this work, though not in others) with "set." See "set."</p>

<p class="dictionary-entry"><strong>Bound variable:</strong> See "open-sentences."</p>

<p class="dictionary-entry"><strong>Backtracking counterfactual:</strong> See "counterfactual."</p>`
    },
    {
      id: "mind",
      title: "Mind and Consciousness", 
      content: `<p class="dictionary-entry"><strong>Commentary on vagueness:</strong> There is a raging debate as to what vagueness is. Some hold that it is a property only of words, thoughts, and the like. Those who hold this are said to have an epistemic view of vagueness, and are sometimes known as "epistemicists." ("Epistemic" means "having to do with knowledge.") This is because they see vagueness as a property, not of the thing known, but of our knowledge of it. Others hold that vagueness is a property of the thing known, and not, at least not merely, of our knowledge of it. Those who hold this are said to believe in "objective" vagueness, the reason being that they believe vagueness to be a property of objects, as opposed to our methods of representing them. According to this view, there may be no fact as to whether Pat is a male or not or as to whether Pat is kind or not, etc. If this is right, then the law of excluded middle (any given proposition P is either 100% true or 100% false) is false.</p>`
    },
    {
      id: "metaphysics",
      title: "Metaphysics and Reality",
      content: `<p class="dictionary-entry"><strong>On objective vagueness:</strong> Here is my view. There is no objective vagueness. "What's out there is out there," as my former colleague Chris Buford once put it. Talk of vagueness in the world is projective. We're projecting deficiencies in our representations of the world onto the world itself. Vagueness is a property of beliefs, symbols, and other representations. Here's why I say to this. To say of a predicate P that it's vague is to say that there is, or at least could be, some object x such that ‹Px› isn't true and ‹not-Px› isn't true. There's nothing mystifying about this sort of vagueness. Symbols have the meanings we give them. If we decide that Px is true if x is 1, 2, or 3, and false if x is 4, 5, or 6 then ‹P7› isn't true and neither is ‹not-P7.› But this isn't because there is some proposition that is neither true nor false. It's because, given how P has been defined, ‹P7› doesn't encode a proposition and neither does ‹not-P7.› For a representation or symbol to be "vague" is simply for it to be under-defined.</p>

<p class="dictionary-entry"><strong>On propositions and vagueness:</strong> But what would it be for a symbol-meaning to be vague? But what would it be, for example, for a sentence-meaning (a proposition) to be vague? Propositions are individuated by their entailment-relations. In other words, a proposition's identity is a function of what it entails and also of what entails it. If proposition P1 entails P2, but P3 does not, or P2 entails P1 but not P3, then P1 and P3 are ipso facto different propositions. Thus, the very idea of a proposition whose entailment-relations are indeterminate is a non-starter. This means that propositions always have determinate truth-conditions. After all, for proposition to have such and such truth-conditions is for such and such propositions to entail it. Thus, a proposition's truth-conditions are either fulfilled or they aren't. There is no other possibility. Thus, there are no indeterminate propositions, and the law of excluded middle (every proposition is either 100% true or 100% false) is correct. See "entailment," "propositions."</p>`
    }
  ]
};

export function getFullDocumentContent(): string {
  return tractatusContent.sections
    .map(section => section.content)
    .join('\n\n');
}

export function getDocumentTitle(): string {
  return tractatusContent.title;
}

export function getDocumentAuthor(): string {
  return tractatusContent.author;
}