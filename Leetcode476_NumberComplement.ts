 //Solves randomly chosen LeetCode problem (476: Number Complement - https://leetcode.com/problems/number-complement/description/) using entirely type-level constructs
 //Note: only works for integers up to 1000 due to type system limitations
 
 type ToTuple
 <
     N extends number,
     Tuple extends unknown[] = []
 > = Tuple["length"] extends N
     ? Tuple
     : ToTuple<N, [...Tuple, []]>;
 
 type IsMod2
 <
     N extends number,
     T extends unknown[] = ToTuple<N>
 > = T extends [unknown, unknown, ...infer Rest]
     ? IsMod2<never, Rest>
     : T["length"] extends 0 ? true : false;
 
 type Div2
 <
     N extends number,
     T extends unknown[] = ToTuple<N>,
     Acc extends unknown[] = []
 > = T extends [unknown, unknown, ...infer Rest]
     ? Div2<never, Rest, [unknown, ...Acc]>
     : Acc["length"];
 
 type ToBinary
 <
     N extends number,
     Iter extends unknown[] = [],
 > = Iter["length"] extends 8
     ? ''
     : `${ ToBinary<Div2<N>, [unknown, ...Iter]> }${ IsMod2<N> extends true ? '0' : '1' }`;
 
 type Truncate
 <
     S extends string,
 > = S extends `0${infer Rest}`
     ? Truncate<Rest>
     : S;
 
 type Complement
 <
     S extends string
 > = S extends `${infer Char extends '0' | '1'}${infer Rest}`
     ? `${Char extends '1' ? '0' : '1'}${Complement<Rest>}`
     : '';
 
 type Add
 <
     A extends number,
     B extends number,
 > = [...ToTuple<A>, ...ToTuple<B>]["length"];
 
 type ToDecimal
 <
     S extends string,
     Acc extends number = 0
 > = S extends `${infer Bit}${infer Rest}`
     ? Add<Acc, Acc> extends infer Shifted extends number
         ? ToDecimal<
             Rest,
             Bit extends '1'
                 ? Add<Shifted, 1> extends number ? Add<Shifted, 1> : never
                 : Shifted
         >
         : never
     : Acc;
 
 type NumberComplement<T extends number> = ToDecimal<Complement<Truncate<ToBinary<T>>>>;
 type result = NumberComplement<50>;