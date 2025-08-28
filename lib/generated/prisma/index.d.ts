
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model medicalcenter_info
 * 
 */
export type medicalcenter_info = $Result.DefaultSelection<Prisma.$medicalcenter_infoPayload>
/**
 * Model patient_info
 * 
 */
export type patient_info = $Result.DefaultSelection<Prisma.$patient_infoPayload>
/**
 * Model patient_uploads
 * 
 */
export type patient_uploads = $Result.DefaultSelection<Prisma.$patient_uploadsPayload>
/**
 * Model room_info
 * 
 */
export type room_info = $Result.DefaultSelection<Prisma.$room_infoPayload>
/**
 * Model bed_info
 * 
 */
export type bed_info = $Result.DefaultSelection<Prisma.$bed_infoPayload>
/**
 * Model room_data
 * 
 */
export type room_data = $Result.DefaultSelection<Prisma.$room_dataPayload>
/**
 * Model room_register
 * 
 */
export type room_register = $Result.DefaultSelection<Prisma.$room_registerPayload>
/**
 * Model user_info
 * 
 */
export type user_info = $Result.DefaultSelection<Prisma.$user_infoPayload>
/**
 * Model user_uploads
 * 
 */
export type user_uploads = $Result.DefaultSelection<Prisma.$user_uploadsPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Medicalcenter_infos
 * const medicalcenter_infos = await prisma.medicalcenter_info.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Medicalcenter_infos
   * const medicalcenter_infos = await prisma.medicalcenter_info.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.medicalcenter_info`: Exposes CRUD operations for the **medicalcenter_info** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Medicalcenter_infos
    * const medicalcenter_infos = await prisma.medicalcenter_info.findMany()
    * ```
    */
  get medicalcenter_info(): Prisma.medicalcenter_infoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient_info`: Exposes CRUD operations for the **patient_info** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patient_infos
    * const patient_infos = await prisma.patient_info.findMany()
    * ```
    */
  get patient_info(): Prisma.patient_infoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.patient_uploads`: Exposes CRUD operations for the **patient_uploads** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Patient_uploads
    * const patient_uploads = await prisma.patient_uploads.findMany()
    * ```
    */
  get patient_uploads(): Prisma.patient_uploadsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room_info`: Exposes CRUD operations for the **room_info** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Room_infos
    * const room_infos = await prisma.room_info.findMany()
    * ```
    */
  get room_info(): Prisma.room_infoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.bed_info`: Exposes CRUD operations for the **bed_info** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Bed_infos
    * const bed_infos = await prisma.bed_info.findMany()
    * ```
    */
  get bed_info(): Prisma.bed_infoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room_data`: Exposes CRUD operations for the **room_data** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Room_data
    * const room_data = await prisma.room_data.findMany()
    * ```
    */
  get room_data(): Prisma.room_dataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room_register`: Exposes CRUD operations for the **room_register** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Room_registers
    * const room_registers = await prisma.room_register.findMany()
    * ```
    */
  get room_register(): Prisma.room_registerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_info`: Exposes CRUD operations for the **user_info** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_infos
    * const user_infos = await prisma.user_info.findMany()
    * ```
    */
  get user_info(): Prisma.user_infoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user_uploads`: Exposes CRUD operations for the **user_uploads** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_uploads
    * const user_uploads = await prisma.user_uploads.findMany()
    * ```
    */
  get user_uploads(): Prisma.user_uploadsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    medicalcenter_info: 'medicalcenter_info',
    patient_info: 'patient_info',
    patient_uploads: 'patient_uploads',
    room_info: 'room_info',
    bed_info: 'bed_info',
    room_data: 'room_data',
    room_register: 'room_register',
    user_info: 'user_info',
    user_uploads: 'user_uploads'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "medicalcenter_info" | "patient_info" | "patient_uploads" | "room_info" | "bed_info" | "room_data" | "room_register" | "user_info" | "user_uploads"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      medicalcenter_info: {
        payload: Prisma.$medicalcenter_infoPayload<ExtArgs>
        fields: Prisma.medicalcenter_infoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.medicalcenter_infoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.medicalcenter_infoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>
          }
          findFirst: {
            args: Prisma.medicalcenter_infoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.medicalcenter_infoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>
          }
          findMany: {
            args: Prisma.medicalcenter_infoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>[]
          }
          create: {
            args: Prisma.medicalcenter_infoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>
          }
          createMany: {
            args: Prisma.medicalcenter_infoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.medicalcenter_infoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>[]
          }
          delete: {
            args: Prisma.medicalcenter_infoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>
          }
          update: {
            args: Prisma.medicalcenter_infoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>
          }
          deleteMany: {
            args: Prisma.medicalcenter_infoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.medicalcenter_infoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.medicalcenter_infoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>[]
          }
          upsert: {
            args: Prisma.medicalcenter_infoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$medicalcenter_infoPayload>
          }
          aggregate: {
            args: Prisma.Medicalcenter_infoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMedicalcenter_info>
          }
          groupBy: {
            args: Prisma.medicalcenter_infoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Medicalcenter_infoGroupByOutputType>[]
          }
          count: {
            args: Prisma.medicalcenter_infoCountArgs<ExtArgs>
            result: $Utils.Optional<Medicalcenter_infoCountAggregateOutputType> | number
          }
        }
      }
      patient_info: {
        payload: Prisma.$patient_infoPayload<ExtArgs>
        fields: Prisma.patient_infoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.patient_infoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.patient_infoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>
          }
          findFirst: {
            args: Prisma.patient_infoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.patient_infoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>
          }
          findMany: {
            args: Prisma.patient_infoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>[]
          }
          create: {
            args: Prisma.patient_infoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>
          }
          createMany: {
            args: Prisma.patient_infoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.patient_infoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>[]
          }
          delete: {
            args: Prisma.patient_infoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>
          }
          update: {
            args: Prisma.patient_infoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>
          }
          deleteMany: {
            args: Prisma.patient_infoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.patient_infoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.patient_infoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>[]
          }
          upsert: {
            args: Prisma.patient_infoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_infoPayload>
          }
          aggregate: {
            args: Prisma.Patient_infoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient_info>
          }
          groupBy: {
            args: Prisma.patient_infoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Patient_infoGroupByOutputType>[]
          }
          count: {
            args: Prisma.patient_infoCountArgs<ExtArgs>
            result: $Utils.Optional<Patient_infoCountAggregateOutputType> | number
          }
        }
      }
      patient_uploads: {
        payload: Prisma.$patient_uploadsPayload<ExtArgs>
        fields: Prisma.patient_uploadsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.patient_uploadsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.patient_uploadsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>
          }
          findFirst: {
            args: Prisma.patient_uploadsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.patient_uploadsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>
          }
          findMany: {
            args: Prisma.patient_uploadsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>[]
          }
          create: {
            args: Prisma.patient_uploadsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>
          }
          createMany: {
            args: Prisma.patient_uploadsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.patient_uploadsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>[]
          }
          delete: {
            args: Prisma.patient_uploadsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>
          }
          update: {
            args: Prisma.patient_uploadsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>
          }
          deleteMany: {
            args: Prisma.patient_uploadsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.patient_uploadsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.patient_uploadsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>[]
          }
          upsert: {
            args: Prisma.patient_uploadsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$patient_uploadsPayload>
          }
          aggregate: {
            args: Prisma.Patient_uploadsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePatient_uploads>
          }
          groupBy: {
            args: Prisma.patient_uploadsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Patient_uploadsGroupByOutputType>[]
          }
          count: {
            args: Prisma.patient_uploadsCountArgs<ExtArgs>
            result: $Utils.Optional<Patient_uploadsCountAggregateOutputType> | number
          }
        }
      }
      room_info: {
        payload: Prisma.$room_infoPayload<ExtArgs>
        fields: Prisma.room_infoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.room_infoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.room_infoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>
          }
          findFirst: {
            args: Prisma.room_infoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.room_infoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>
          }
          findMany: {
            args: Prisma.room_infoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>[]
          }
          create: {
            args: Prisma.room_infoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>
          }
          createMany: {
            args: Prisma.room_infoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.room_infoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>[]
          }
          delete: {
            args: Prisma.room_infoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>
          }
          update: {
            args: Prisma.room_infoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>
          }
          deleteMany: {
            args: Prisma.room_infoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.room_infoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.room_infoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>[]
          }
          upsert: {
            args: Prisma.room_infoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_infoPayload>
          }
          aggregate: {
            args: Prisma.Room_infoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom_info>
          }
          groupBy: {
            args: Prisma.room_infoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Room_infoGroupByOutputType>[]
          }
          count: {
            args: Prisma.room_infoCountArgs<ExtArgs>
            result: $Utils.Optional<Room_infoCountAggregateOutputType> | number
          }
        }
      }
      bed_info: {
        payload: Prisma.$bed_infoPayload<ExtArgs>
        fields: Prisma.bed_infoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.bed_infoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.bed_infoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>
          }
          findFirst: {
            args: Prisma.bed_infoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.bed_infoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>
          }
          findMany: {
            args: Prisma.bed_infoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>[]
          }
          create: {
            args: Prisma.bed_infoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>
          }
          createMany: {
            args: Prisma.bed_infoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.bed_infoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>[]
          }
          delete: {
            args: Prisma.bed_infoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>
          }
          update: {
            args: Prisma.bed_infoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>
          }
          deleteMany: {
            args: Prisma.bed_infoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.bed_infoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.bed_infoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>[]
          }
          upsert: {
            args: Prisma.bed_infoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$bed_infoPayload>
          }
          aggregate: {
            args: Prisma.Bed_infoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBed_info>
          }
          groupBy: {
            args: Prisma.bed_infoGroupByArgs<ExtArgs>
            result: $Utils.Optional<Bed_infoGroupByOutputType>[]
          }
          count: {
            args: Prisma.bed_infoCountArgs<ExtArgs>
            result: $Utils.Optional<Bed_infoCountAggregateOutputType> | number
          }
        }
      }
      room_data: {
        payload: Prisma.$room_dataPayload<ExtArgs>
        fields: Prisma.room_dataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.room_dataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.room_dataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>
          }
          findFirst: {
            args: Prisma.room_dataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.room_dataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>
          }
          findMany: {
            args: Prisma.room_dataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>[]
          }
          create: {
            args: Prisma.room_dataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>
          }
          createMany: {
            args: Prisma.room_dataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.room_dataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>[]
          }
          delete: {
            args: Prisma.room_dataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>
          }
          update: {
            args: Prisma.room_dataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>
          }
          deleteMany: {
            args: Prisma.room_dataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.room_dataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.room_dataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>[]
          }
          upsert: {
            args: Prisma.room_dataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_dataPayload>
          }
          aggregate: {
            args: Prisma.Room_dataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom_data>
          }
          groupBy: {
            args: Prisma.room_dataGroupByArgs<ExtArgs>
            result: $Utils.Optional<Room_dataGroupByOutputType>[]
          }
          count: {
            args: Prisma.room_dataCountArgs<ExtArgs>
            result: $Utils.Optional<Room_dataCountAggregateOutputType> | number
          }
        }
      }
      room_register: {
        payload: Prisma.$room_registerPayload<ExtArgs>
        fields: Prisma.room_registerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.room_registerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.room_registerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>
          }
          findFirst: {
            args: Prisma.room_registerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.room_registerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>
          }
          findMany: {
            args: Prisma.room_registerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>[]
          }
          create: {
            args: Prisma.room_registerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>
          }
          createMany: {
            args: Prisma.room_registerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.room_registerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>[]
          }
          delete: {
            args: Prisma.room_registerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>
          }
          update: {
            args: Prisma.room_registerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>
          }
          deleteMany: {
            args: Prisma.room_registerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.room_registerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.room_registerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>[]
          }
          upsert: {
            args: Prisma.room_registerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$room_registerPayload>
          }
          aggregate: {
            args: Prisma.Room_registerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom_register>
          }
          groupBy: {
            args: Prisma.room_registerGroupByArgs<ExtArgs>
            result: $Utils.Optional<Room_registerGroupByOutputType>[]
          }
          count: {
            args: Prisma.room_registerCountArgs<ExtArgs>
            result: $Utils.Optional<Room_registerCountAggregateOutputType> | number
          }
        }
      }
      user_info: {
        payload: Prisma.$user_infoPayload<ExtArgs>
        fields: Prisma.user_infoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_infoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_infoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          findFirst: {
            args: Prisma.user_infoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_infoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          findMany: {
            args: Prisma.user_infoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>[]
          }
          create: {
            args: Prisma.user_infoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          createMany: {
            args: Prisma.user_infoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_infoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>[]
          }
          delete: {
            args: Prisma.user_infoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          update: {
            args: Prisma.user_infoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          deleteMany: {
            args: Prisma.user_infoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_infoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_infoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>[]
          }
          upsert: {
            args: Prisma.user_infoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_infoPayload>
          }
          aggregate: {
            args: Prisma.User_infoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_info>
          }
          groupBy: {
            args: Prisma.user_infoGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_infoGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_infoCountArgs<ExtArgs>
            result: $Utils.Optional<User_infoCountAggregateOutputType> | number
          }
        }
      }
      user_uploads: {
        payload: Prisma.$user_uploadsPayload<ExtArgs>
        fields: Prisma.user_uploadsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.user_uploadsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.user_uploadsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>
          }
          findFirst: {
            args: Prisma.user_uploadsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.user_uploadsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>
          }
          findMany: {
            args: Prisma.user_uploadsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>[]
          }
          create: {
            args: Prisma.user_uploadsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>
          }
          createMany: {
            args: Prisma.user_uploadsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.user_uploadsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>[]
          }
          delete: {
            args: Prisma.user_uploadsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>
          }
          update: {
            args: Prisma.user_uploadsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>
          }
          deleteMany: {
            args: Prisma.user_uploadsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.user_uploadsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.user_uploadsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>[]
          }
          upsert: {
            args: Prisma.user_uploadsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$user_uploadsPayload>
          }
          aggregate: {
            args: Prisma.User_uploadsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser_uploads>
          }
          groupBy: {
            args: Prisma.user_uploadsGroupByArgs<ExtArgs>
            result: $Utils.Optional<User_uploadsGroupByOutputType>[]
          }
          count: {
            args: Prisma.user_uploadsCountArgs<ExtArgs>
            result: $Utils.Optional<User_uploadsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    medicalcenter_info?: medicalcenter_infoOmit
    patient_info?: patient_infoOmit
    patient_uploads?: patient_uploadsOmit
    room_info?: room_infoOmit
    bed_info?: bed_infoOmit
    room_data?: room_dataOmit
    room_register?: room_registerOmit
    user_info?: user_infoOmit
    user_uploads?: user_uploadsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Medicalcenter_infoCountOutputType
   */

  export type Medicalcenter_infoCountOutputType = {
    patient_info: number
    room_info: number
    room_register: number
    user_info: number
    user_uploads: number
  }

  export type Medicalcenter_infoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient_info?: boolean | Medicalcenter_infoCountOutputTypeCountPatient_infoArgs
    room_info?: boolean | Medicalcenter_infoCountOutputTypeCountRoom_infoArgs
    room_register?: boolean | Medicalcenter_infoCountOutputTypeCountRoom_registerArgs
    user_info?: boolean | Medicalcenter_infoCountOutputTypeCountUser_infoArgs
    user_uploads?: boolean | Medicalcenter_infoCountOutputTypeCountUser_uploadsArgs
  }

  // Custom InputTypes
  /**
   * Medicalcenter_infoCountOutputType without action
   */
  export type Medicalcenter_infoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Medicalcenter_infoCountOutputType
     */
    select?: Medicalcenter_infoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Medicalcenter_infoCountOutputType without action
   */
  export type Medicalcenter_infoCountOutputTypeCountPatient_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: patient_infoWhereInput
  }

  /**
   * Medicalcenter_infoCountOutputType without action
   */
  export type Medicalcenter_infoCountOutputTypeCountRoom_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_infoWhereInput
  }

  /**
   * Medicalcenter_infoCountOutputType without action
   */
  export type Medicalcenter_infoCountOutputTypeCountRoom_registerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_registerWhereInput
  }

  /**
   * Medicalcenter_infoCountOutputType without action
   */
  export type Medicalcenter_infoCountOutputTypeCountUser_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_infoWhereInput
  }

  /**
   * Medicalcenter_infoCountOutputType without action
   */
  export type Medicalcenter_infoCountOutputTypeCountUser_uploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_uploadsWhereInput
  }


  /**
   * Count Type Patient_infoCountOutputType
   */

  export type Patient_infoCountOutputType = {
    bed_info: number
    patient_uploads: number
    room_register: number
  }

  export type Patient_infoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | Patient_infoCountOutputTypeCountBed_infoArgs
    patient_uploads?: boolean | Patient_infoCountOutputTypeCountPatient_uploadsArgs
    room_register?: boolean | Patient_infoCountOutputTypeCountRoom_registerArgs
  }

  // Custom InputTypes
  /**
   * Patient_infoCountOutputType without action
   */
  export type Patient_infoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Patient_infoCountOutputType
     */
    select?: Patient_infoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Patient_infoCountOutputType without action
   */
  export type Patient_infoCountOutputTypeCountBed_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bed_infoWhereInput
  }

  /**
   * Patient_infoCountOutputType without action
   */
  export type Patient_infoCountOutputTypeCountPatient_uploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: patient_uploadsWhereInput
  }

  /**
   * Patient_infoCountOutputType without action
   */
  export type Patient_infoCountOutputTypeCountRoom_registerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_registerWhereInput
  }


  /**
   * Count Type Room_infoCountOutputType
   */

  export type Room_infoCountOutputType = {
    bed_info: number
    room_register: number
  }

  export type Room_infoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | Room_infoCountOutputTypeCountBed_infoArgs
    room_register?: boolean | Room_infoCountOutputTypeCountRoom_registerArgs
  }

  // Custom InputTypes
  /**
   * Room_infoCountOutputType without action
   */
  export type Room_infoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room_infoCountOutputType
     */
    select?: Room_infoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Room_infoCountOutputType without action
   */
  export type Room_infoCountOutputTypeCountBed_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bed_infoWhereInput
  }

  /**
   * Room_infoCountOutputType without action
   */
  export type Room_infoCountOutputTypeCountRoom_registerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_registerWhereInput
  }


  /**
   * Count Type Bed_infoCountOutputType
   */

  export type Bed_infoCountOutputType = {
    room_data: number
  }

  export type Bed_infoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room_data?: boolean | Bed_infoCountOutputTypeCountRoom_dataArgs
  }

  // Custom InputTypes
  /**
   * Bed_infoCountOutputType without action
   */
  export type Bed_infoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Bed_infoCountOutputType
     */
    select?: Bed_infoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Bed_infoCountOutputType without action
   */
  export type Bed_infoCountOutputTypeCountRoom_dataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_dataWhereInput
  }


  /**
   * Count Type User_infoCountOutputType
   */

  export type User_infoCountOutputType = {
    bed_info: number
    user_uploads: number
  }

  export type User_infoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | User_infoCountOutputTypeCountBed_infoArgs
    user_uploads?: boolean | User_infoCountOutputTypeCountUser_uploadsArgs
  }

  // Custom InputTypes
  /**
   * User_infoCountOutputType without action
   */
  export type User_infoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User_infoCountOutputType
     */
    select?: User_infoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * User_infoCountOutputType without action
   */
  export type User_infoCountOutputTypeCountBed_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bed_infoWhereInput
  }

  /**
   * User_infoCountOutputType without action
   */
  export type User_infoCountOutputTypeCountUser_uploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_uploadsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model medicalcenter_info
   */

  export type AggregateMedicalcenter_info = {
    _count: Medicalcenter_infoCountAggregateOutputType | null
    _avg: Medicalcenter_infoAvgAggregateOutputType | null
    _sum: Medicalcenter_infoSumAggregateOutputType | null
    _min: Medicalcenter_infoMinAggregateOutputType | null
    _max: Medicalcenter_infoMaxAggregateOutputType | null
  }

  export type Medicalcenter_infoAvgAggregateOutputType = {
    center_id: number | null
  }

  export type Medicalcenter_infoSumAggregateOutputType = {
    center_id: number | null
  }

  export type Medicalcenter_infoMinAggregateOutputType = {
    center_id: number | null
    center_name: string | null
    address: string | null
    email: string | null
  }

  export type Medicalcenter_infoMaxAggregateOutputType = {
    center_id: number | null
    center_name: string | null
    address: string | null
    email: string | null
  }

  export type Medicalcenter_infoCountAggregateOutputType = {
    center_id: number
    center_name: number
    address: number
    email: number
    _all: number
  }


  export type Medicalcenter_infoAvgAggregateInputType = {
    center_id?: true
  }

  export type Medicalcenter_infoSumAggregateInputType = {
    center_id?: true
  }

  export type Medicalcenter_infoMinAggregateInputType = {
    center_id?: true
    center_name?: true
    address?: true
    email?: true
  }

  export type Medicalcenter_infoMaxAggregateInputType = {
    center_id?: true
    center_name?: true
    address?: true
    email?: true
  }

  export type Medicalcenter_infoCountAggregateInputType = {
    center_id?: true
    center_name?: true
    address?: true
    email?: true
    _all?: true
  }

  export type Medicalcenter_infoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which medicalcenter_info to aggregate.
     */
    where?: medicalcenter_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of medicalcenter_infos to fetch.
     */
    orderBy?: medicalcenter_infoOrderByWithRelationInput | medicalcenter_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: medicalcenter_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` medicalcenter_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` medicalcenter_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned medicalcenter_infos
    **/
    _count?: true | Medicalcenter_infoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Medicalcenter_infoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Medicalcenter_infoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Medicalcenter_infoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Medicalcenter_infoMaxAggregateInputType
  }

  export type GetMedicalcenter_infoAggregateType<T extends Medicalcenter_infoAggregateArgs> = {
        [P in keyof T & keyof AggregateMedicalcenter_info]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMedicalcenter_info[P]>
      : GetScalarType<T[P], AggregateMedicalcenter_info[P]>
  }




  export type medicalcenter_infoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: medicalcenter_infoWhereInput
    orderBy?: medicalcenter_infoOrderByWithAggregationInput | medicalcenter_infoOrderByWithAggregationInput[]
    by: Medicalcenter_infoScalarFieldEnum[] | Medicalcenter_infoScalarFieldEnum
    having?: medicalcenter_infoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Medicalcenter_infoCountAggregateInputType | true
    _avg?: Medicalcenter_infoAvgAggregateInputType
    _sum?: Medicalcenter_infoSumAggregateInputType
    _min?: Medicalcenter_infoMinAggregateInputType
    _max?: Medicalcenter_infoMaxAggregateInputType
  }

  export type Medicalcenter_infoGroupByOutputType = {
    center_id: number
    center_name: string
    address: string | null
    email: string | null
    _count: Medicalcenter_infoCountAggregateOutputType | null
    _avg: Medicalcenter_infoAvgAggregateOutputType | null
    _sum: Medicalcenter_infoSumAggregateOutputType | null
    _min: Medicalcenter_infoMinAggregateOutputType | null
    _max: Medicalcenter_infoMaxAggregateOutputType | null
  }

  type GetMedicalcenter_infoGroupByPayload<T extends medicalcenter_infoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Medicalcenter_infoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Medicalcenter_infoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Medicalcenter_infoGroupByOutputType[P]>
            : GetScalarType<T[P], Medicalcenter_infoGroupByOutputType[P]>
        }
      >
    >


  export type medicalcenter_infoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    center_id?: boolean
    center_name?: boolean
    address?: boolean
    email?: boolean
    patient_info?: boolean | medicalcenter_info$patient_infoArgs<ExtArgs>
    room_info?: boolean | medicalcenter_info$room_infoArgs<ExtArgs>
    room_register?: boolean | medicalcenter_info$room_registerArgs<ExtArgs>
    user_info?: boolean | medicalcenter_info$user_infoArgs<ExtArgs>
    user_uploads?: boolean | medicalcenter_info$user_uploadsArgs<ExtArgs>
    _count?: boolean | Medicalcenter_infoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["medicalcenter_info"]>

  export type medicalcenter_infoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    center_id?: boolean
    center_name?: boolean
    address?: boolean
    email?: boolean
  }, ExtArgs["result"]["medicalcenter_info"]>

  export type medicalcenter_infoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    center_id?: boolean
    center_name?: boolean
    address?: boolean
    email?: boolean
  }, ExtArgs["result"]["medicalcenter_info"]>

  export type medicalcenter_infoSelectScalar = {
    center_id?: boolean
    center_name?: boolean
    address?: boolean
    email?: boolean
  }

  export type medicalcenter_infoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"center_id" | "center_name" | "address" | "email", ExtArgs["result"]["medicalcenter_info"]>
  export type medicalcenter_infoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient_info?: boolean | medicalcenter_info$patient_infoArgs<ExtArgs>
    room_info?: boolean | medicalcenter_info$room_infoArgs<ExtArgs>
    room_register?: boolean | medicalcenter_info$room_registerArgs<ExtArgs>
    user_info?: boolean | medicalcenter_info$user_infoArgs<ExtArgs>
    user_uploads?: boolean | medicalcenter_info$user_uploadsArgs<ExtArgs>
    _count?: boolean | Medicalcenter_infoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type medicalcenter_infoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type medicalcenter_infoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $medicalcenter_infoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "medicalcenter_info"
    objects: {
      patient_info: Prisma.$patient_infoPayload<ExtArgs>[]
      room_info: Prisma.$room_infoPayload<ExtArgs>[]
      room_register: Prisma.$room_registerPayload<ExtArgs>[]
      user_info: Prisma.$user_infoPayload<ExtArgs>[]
      user_uploads: Prisma.$user_uploadsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      center_id: number
      center_name: string
      address: string | null
      email: string | null
    }, ExtArgs["result"]["medicalcenter_info"]>
    composites: {}
  }

  type medicalcenter_infoGetPayload<S extends boolean | null | undefined | medicalcenter_infoDefaultArgs> = $Result.GetResult<Prisma.$medicalcenter_infoPayload, S>

  type medicalcenter_infoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<medicalcenter_infoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Medicalcenter_infoCountAggregateInputType | true
    }

  export interface medicalcenter_infoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['medicalcenter_info'], meta: { name: 'medicalcenter_info' } }
    /**
     * Find zero or one Medicalcenter_info that matches the filter.
     * @param {medicalcenter_infoFindUniqueArgs} args - Arguments to find a Medicalcenter_info
     * @example
     * // Get one Medicalcenter_info
     * const medicalcenter_info = await prisma.medicalcenter_info.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends medicalcenter_infoFindUniqueArgs>(args: SelectSubset<T, medicalcenter_infoFindUniqueArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Medicalcenter_info that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {medicalcenter_infoFindUniqueOrThrowArgs} args - Arguments to find a Medicalcenter_info
     * @example
     * // Get one Medicalcenter_info
     * const medicalcenter_info = await prisma.medicalcenter_info.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends medicalcenter_infoFindUniqueOrThrowArgs>(args: SelectSubset<T, medicalcenter_infoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medicalcenter_info that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicalcenter_infoFindFirstArgs} args - Arguments to find a Medicalcenter_info
     * @example
     * // Get one Medicalcenter_info
     * const medicalcenter_info = await prisma.medicalcenter_info.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends medicalcenter_infoFindFirstArgs>(args?: SelectSubset<T, medicalcenter_infoFindFirstArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Medicalcenter_info that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicalcenter_infoFindFirstOrThrowArgs} args - Arguments to find a Medicalcenter_info
     * @example
     * // Get one Medicalcenter_info
     * const medicalcenter_info = await prisma.medicalcenter_info.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends medicalcenter_infoFindFirstOrThrowArgs>(args?: SelectSubset<T, medicalcenter_infoFindFirstOrThrowArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Medicalcenter_infos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicalcenter_infoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Medicalcenter_infos
     * const medicalcenter_infos = await prisma.medicalcenter_info.findMany()
     * 
     * // Get first 10 Medicalcenter_infos
     * const medicalcenter_infos = await prisma.medicalcenter_info.findMany({ take: 10 })
     * 
     * // Only select the `center_id`
     * const medicalcenter_infoWithCenter_idOnly = await prisma.medicalcenter_info.findMany({ select: { center_id: true } })
     * 
     */
    findMany<T extends medicalcenter_infoFindManyArgs>(args?: SelectSubset<T, medicalcenter_infoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Medicalcenter_info.
     * @param {medicalcenter_infoCreateArgs} args - Arguments to create a Medicalcenter_info.
     * @example
     * // Create one Medicalcenter_info
     * const Medicalcenter_info = await prisma.medicalcenter_info.create({
     *   data: {
     *     // ... data to create a Medicalcenter_info
     *   }
     * })
     * 
     */
    create<T extends medicalcenter_infoCreateArgs>(args: SelectSubset<T, medicalcenter_infoCreateArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Medicalcenter_infos.
     * @param {medicalcenter_infoCreateManyArgs} args - Arguments to create many Medicalcenter_infos.
     * @example
     * // Create many Medicalcenter_infos
     * const medicalcenter_info = await prisma.medicalcenter_info.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends medicalcenter_infoCreateManyArgs>(args?: SelectSubset<T, medicalcenter_infoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Medicalcenter_infos and returns the data saved in the database.
     * @param {medicalcenter_infoCreateManyAndReturnArgs} args - Arguments to create many Medicalcenter_infos.
     * @example
     * // Create many Medicalcenter_infos
     * const medicalcenter_info = await prisma.medicalcenter_info.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Medicalcenter_infos and only return the `center_id`
     * const medicalcenter_infoWithCenter_idOnly = await prisma.medicalcenter_info.createManyAndReturn({
     *   select: { center_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends medicalcenter_infoCreateManyAndReturnArgs>(args?: SelectSubset<T, medicalcenter_infoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Medicalcenter_info.
     * @param {medicalcenter_infoDeleteArgs} args - Arguments to delete one Medicalcenter_info.
     * @example
     * // Delete one Medicalcenter_info
     * const Medicalcenter_info = await prisma.medicalcenter_info.delete({
     *   where: {
     *     // ... filter to delete one Medicalcenter_info
     *   }
     * })
     * 
     */
    delete<T extends medicalcenter_infoDeleteArgs>(args: SelectSubset<T, medicalcenter_infoDeleteArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Medicalcenter_info.
     * @param {medicalcenter_infoUpdateArgs} args - Arguments to update one Medicalcenter_info.
     * @example
     * // Update one Medicalcenter_info
     * const medicalcenter_info = await prisma.medicalcenter_info.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends medicalcenter_infoUpdateArgs>(args: SelectSubset<T, medicalcenter_infoUpdateArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Medicalcenter_infos.
     * @param {medicalcenter_infoDeleteManyArgs} args - Arguments to filter Medicalcenter_infos to delete.
     * @example
     * // Delete a few Medicalcenter_infos
     * const { count } = await prisma.medicalcenter_info.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends medicalcenter_infoDeleteManyArgs>(args?: SelectSubset<T, medicalcenter_infoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medicalcenter_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicalcenter_infoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Medicalcenter_infos
     * const medicalcenter_info = await prisma.medicalcenter_info.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends medicalcenter_infoUpdateManyArgs>(args: SelectSubset<T, medicalcenter_infoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Medicalcenter_infos and returns the data updated in the database.
     * @param {medicalcenter_infoUpdateManyAndReturnArgs} args - Arguments to update many Medicalcenter_infos.
     * @example
     * // Update many Medicalcenter_infos
     * const medicalcenter_info = await prisma.medicalcenter_info.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Medicalcenter_infos and only return the `center_id`
     * const medicalcenter_infoWithCenter_idOnly = await prisma.medicalcenter_info.updateManyAndReturn({
     *   select: { center_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends medicalcenter_infoUpdateManyAndReturnArgs>(args: SelectSubset<T, medicalcenter_infoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Medicalcenter_info.
     * @param {medicalcenter_infoUpsertArgs} args - Arguments to update or create a Medicalcenter_info.
     * @example
     * // Update or create a Medicalcenter_info
     * const medicalcenter_info = await prisma.medicalcenter_info.upsert({
     *   create: {
     *     // ... data to create a Medicalcenter_info
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Medicalcenter_info we want to update
     *   }
     * })
     */
    upsert<T extends medicalcenter_infoUpsertArgs>(args: SelectSubset<T, medicalcenter_infoUpsertArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Medicalcenter_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicalcenter_infoCountArgs} args - Arguments to filter Medicalcenter_infos to count.
     * @example
     * // Count the number of Medicalcenter_infos
     * const count = await prisma.medicalcenter_info.count({
     *   where: {
     *     // ... the filter for the Medicalcenter_infos we want to count
     *   }
     * })
    **/
    count<T extends medicalcenter_infoCountArgs>(
      args?: Subset<T, medicalcenter_infoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Medicalcenter_infoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Medicalcenter_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Medicalcenter_infoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Medicalcenter_infoAggregateArgs>(args: Subset<T, Medicalcenter_infoAggregateArgs>): Prisma.PrismaPromise<GetMedicalcenter_infoAggregateType<T>>

    /**
     * Group by Medicalcenter_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {medicalcenter_infoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends medicalcenter_infoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: medicalcenter_infoGroupByArgs['orderBy'] }
        : { orderBy?: medicalcenter_infoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, medicalcenter_infoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMedicalcenter_infoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the medicalcenter_info model
   */
  readonly fields: medicalcenter_infoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for medicalcenter_info.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__medicalcenter_infoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient_info<T extends medicalcenter_info$patient_infoArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_info$patient_infoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    room_info<T extends medicalcenter_info$room_infoArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_info$room_infoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    room_register<T extends medicalcenter_info$room_registerArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_info$room_registerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_info<T extends medicalcenter_info$user_infoArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_info$user_infoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_uploads<T extends medicalcenter_info$user_uploadsArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_info$user_uploadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the medicalcenter_info model
   */
  interface medicalcenter_infoFieldRefs {
    readonly center_id: FieldRef<"medicalcenter_info", 'Int'>
    readonly center_name: FieldRef<"medicalcenter_info", 'String'>
    readonly address: FieldRef<"medicalcenter_info", 'String'>
    readonly email: FieldRef<"medicalcenter_info", 'String'>
  }
    

  // Custom InputTypes
  /**
   * medicalcenter_info findUnique
   */
  export type medicalcenter_infoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * Filter, which medicalcenter_info to fetch.
     */
    where: medicalcenter_infoWhereUniqueInput
  }

  /**
   * medicalcenter_info findUniqueOrThrow
   */
  export type medicalcenter_infoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * Filter, which medicalcenter_info to fetch.
     */
    where: medicalcenter_infoWhereUniqueInput
  }

  /**
   * medicalcenter_info findFirst
   */
  export type medicalcenter_infoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * Filter, which medicalcenter_info to fetch.
     */
    where?: medicalcenter_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of medicalcenter_infos to fetch.
     */
    orderBy?: medicalcenter_infoOrderByWithRelationInput | medicalcenter_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for medicalcenter_infos.
     */
    cursor?: medicalcenter_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` medicalcenter_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` medicalcenter_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of medicalcenter_infos.
     */
    distinct?: Medicalcenter_infoScalarFieldEnum | Medicalcenter_infoScalarFieldEnum[]
  }

  /**
   * medicalcenter_info findFirstOrThrow
   */
  export type medicalcenter_infoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * Filter, which medicalcenter_info to fetch.
     */
    where?: medicalcenter_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of medicalcenter_infos to fetch.
     */
    orderBy?: medicalcenter_infoOrderByWithRelationInput | medicalcenter_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for medicalcenter_infos.
     */
    cursor?: medicalcenter_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` medicalcenter_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` medicalcenter_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of medicalcenter_infos.
     */
    distinct?: Medicalcenter_infoScalarFieldEnum | Medicalcenter_infoScalarFieldEnum[]
  }

  /**
   * medicalcenter_info findMany
   */
  export type medicalcenter_infoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * Filter, which medicalcenter_infos to fetch.
     */
    where?: medicalcenter_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of medicalcenter_infos to fetch.
     */
    orderBy?: medicalcenter_infoOrderByWithRelationInput | medicalcenter_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing medicalcenter_infos.
     */
    cursor?: medicalcenter_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` medicalcenter_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` medicalcenter_infos.
     */
    skip?: number
    distinct?: Medicalcenter_infoScalarFieldEnum | Medicalcenter_infoScalarFieldEnum[]
  }

  /**
   * medicalcenter_info create
   */
  export type medicalcenter_infoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * The data needed to create a medicalcenter_info.
     */
    data: XOR<medicalcenter_infoCreateInput, medicalcenter_infoUncheckedCreateInput>
  }

  /**
   * medicalcenter_info createMany
   */
  export type medicalcenter_infoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many medicalcenter_infos.
     */
    data: medicalcenter_infoCreateManyInput | medicalcenter_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * medicalcenter_info createManyAndReturn
   */
  export type medicalcenter_infoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * The data used to create many medicalcenter_infos.
     */
    data: medicalcenter_infoCreateManyInput | medicalcenter_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * medicalcenter_info update
   */
  export type medicalcenter_infoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * The data needed to update a medicalcenter_info.
     */
    data: XOR<medicalcenter_infoUpdateInput, medicalcenter_infoUncheckedUpdateInput>
    /**
     * Choose, which medicalcenter_info to update.
     */
    where: medicalcenter_infoWhereUniqueInput
  }

  /**
   * medicalcenter_info updateMany
   */
  export type medicalcenter_infoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update medicalcenter_infos.
     */
    data: XOR<medicalcenter_infoUpdateManyMutationInput, medicalcenter_infoUncheckedUpdateManyInput>
    /**
     * Filter which medicalcenter_infos to update
     */
    where?: medicalcenter_infoWhereInput
    /**
     * Limit how many medicalcenter_infos to update.
     */
    limit?: number
  }

  /**
   * medicalcenter_info updateManyAndReturn
   */
  export type medicalcenter_infoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * The data used to update medicalcenter_infos.
     */
    data: XOR<medicalcenter_infoUpdateManyMutationInput, medicalcenter_infoUncheckedUpdateManyInput>
    /**
     * Filter which medicalcenter_infos to update
     */
    where?: medicalcenter_infoWhereInput
    /**
     * Limit how many medicalcenter_infos to update.
     */
    limit?: number
  }

  /**
   * medicalcenter_info upsert
   */
  export type medicalcenter_infoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * The filter to search for the medicalcenter_info to update in case it exists.
     */
    where: medicalcenter_infoWhereUniqueInput
    /**
     * In case the medicalcenter_info found by the `where` argument doesn't exist, create a new medicalcenter_info with this data.
     */
    create: XOR<medicalcenter_infoCreateInput, medicalcenter_infoUncheckedCreateInput>
    /**
     * In case the medicalcenter_info was found with the provided `where` argument, update it with this data.
     */
    update: XOR<medicalcenter_infoUpdateInput, medicalcenter_infoUncheckedUpdateInput>
  }

  /**
   * medicalcenter_info delete
   */
  export type medicalcenter_infoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
    /**
     * Filter which medicalcenter_info to delete.
     */
    where: medicalcenter_infoWhereUniqueInput
  }

  /**
   * medicalcenter_info deleteMany
   */
  export type medicalcenter_infoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which medicalcenter_infos to delete
     */
    where?: medicalcenter_infoWhereInput
    /**
     * Limit how many medicalcenter_infos to delete.
     */
    limit?: number
  }

  /**
   * medicalcenter_info.patient_info
   */
  export type medicalcenter_info$patient_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    where?: patient_infoWhereInput
    orderBy?: patient_infoOrderByWithRelationInput | patient_infoOrderByWithRelationInput[]
    cursor?: patient_infoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Patient_infoScalarFieldEnum | Patient_infoScalarFieldEnum[]
  }

  /**
   * medicalcenter_info.room_info
   */
  export type medicalcenter_info$room_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    where?: room_infoWhereInput
    orderBy?: room_infoOrderByWithRelationInput | room_infoOrderByWithRelationInput[]
    cursor?: room_infoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Room_infoScalarFieldEnum | Room_infoScalarFieldEnum[]
  }

  /**
   * medicalcenter_info.room_register
   */
  export type medicalcenter_info$room_registerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    where?: room_registerWhereInput
    orderBy?: room_registerOrderByWithRelationInput | room_registerOrderByWithRelationInput[]
    cursor?: room_registerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Room_registerScalarFieldEnum | Room_registerScalarFieldEnum[]
  }

  /**
   * medicalcenter_info.user_info
   */
  export type medicalcenter_info$user_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    where?: user_infoWhereInput
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    cursor?: user_infoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_infoScalarFieldEnum | User_infoScalarFieldEnum[]
  }

  /**
   * medicalcenter_info.user_uploads
   */
  export type medicalcenter_info$user_uploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    where?: user_uploadsWhereInput
    orderBy?: user_uploadsOrderByWithRelationInput | user_uploadsOrderByWithRelationInput[]
    cursor?: user_uploadsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_uploadsScalarFieldEnum | User_uploadsScalarFieldEnum[]
  }

  /**
   * medicalcenter_info without action
   */
  export type medicalcenter_infoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the medicalcenter_info
     */
    select?: medicalcenter_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the medicalcenter_info
     */
    omit?: medicalcenter_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: medicalcenter_infoInclude<ExtArgs> | null
  }


  /**
   * Model patient_info
   */

  export type AggregatePatient_info = {
    _count: Patient_infoCountAggregateOutputType | null
    _avg: Patient_infoAvgAggregateOutputType | null
    _sum: Patient_infoSumAggregateOutputType | null
    _min: Patient_infoMinAggregateOutputType | null
    _max: Patient_infoMaxAggregateOutputType | null
  }

  export type Patient_infoAvgAggregateOutputType = {
    patient_id: number | null
    center_id: number | null
  }

  export type Patient_infoSumAggregateOutputType = {
    patient_id: number | null
    center_id: number | null
  }

  export type Patient_infoMinAggregateOutputType = {
    patient_id: number | null
    patient_name: string | null
    registered_date: Date | null
    center_id: number | null
    dicharged_date: Date | null
    is_discharged: boolean | null
  }

  export type Patient_infoMaxAggregateOutputType = {
    patient_id: number | null
    patient_name: string | null
    registered_date: Date | null
    center_id: number | null
    dicharged_date: Date | null
    is_discharged: boolean | null
  }

  export type Patient_infoCountAggregateOutputType = {
    patient_id: number
    patient_name: number
    registered_date: number
    center_id: number
    dicharged_date: number
    is_discharged: number
    _all: number
  }


  export type Patient_infoAvgAggregateInputType = {
    patient_id?: true
    center_id?: true
  }

  export type Patient_infoSumAggregateInputType = {
    patient_id?: true
    center_id?: true
  }

  export type Patient_infoMinAggregateInputType = {
    patient_id?: true
    patient_name?: true
    registered_date?: true
    center_id?: true
    dicharged_date?: true
    is_discharged?: true
  }

  export type Patient_infoMaxAggregateInputType = {
    patient_id?: true
    patient_name?: true
    registered_date?: true
    center_id?: true
    dicharged_date?: true
    is_discharged?: true
  }

  export type Patient_infoCountAggregateInputType = {
    patient_id?: true
    patient_name?: true
    registered_date?: true
    center_id?: true
    dicharged_date?: true
    is_discharged?: true
    _all?: true
  }

  export type Patient_infoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which patient_info to aggregate.
     */
    where?: patient_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of patient_infos to fetch.
     */
    orderBy?: patient_infoOrderByWithRelationInput | patient_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: patient_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` patient_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` patient_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned patient_infos
    **/
    _count?: true | Patient_infoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Patient_infoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Patient_infoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Patient_infoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Patient_infoMaxAggregateInputType
  }

  export type GetPatient_infoAggregateType<T extends Patient_infoAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient_info]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient_info[P]>
      : GetScalarType<T[P], AggregatePatient_info[P]>
  }




  export type patient_infoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: patient_infoWhereInput
    orderBy?: patient_infoOrderByWithAggregationInput | patient_infoOrderByWithAggregationInput[]
    by: Patient_infoScalarFieldEnum[] | Patient_infoScalarFieldEnum
    having?: patient_infoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Patient_infoCountAggregateInputType | true
    _avg?: Patient_infoAvgAggregateInputType
    _sum?: Patient_infoSumAggregateInputType
    _min?: Patient_infoMinAggregateInputType
    _max?: Patient_infoMaxAggregateInputType
  }

  export type Patient_infoGroupByOutputType = {
    patient_id: number
    patient_name: string
    registered_date: Date
    center_id: number
    dicharged_date: Date | null
    is_discharged: boolean
    _count: Patient_infoCountAggregateOutputType | null
    _avg: Patient_infoAvgAggregateOutputType | null
    _sum: Patient_infoSumAggregateOutputType | null
    _min: Patient_infoMinAggregateOutputType | null
    _max: Patient_infoMaxAggregateOutputType | null
  }

  type GetPatient_infoGroupByPayload<T extends patient_infoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Patient_infoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Patient_infoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Patient_infoGroupByOutputType[P]>
            : GetScalarType<T[P], Patient_infoGroupByOutputType[P]>
        }
      >
    >


  export type patient_infoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    patient_id?: boolean
    patient_name?: boolean
    registered_date?: boolean
    center_id?: boolean
    dicharged_date?: boolean
    is_discharged?: boolean
    bed_info?: boolean | patient_info$bed_infoArgs<ExtArgs>
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    patient_uploads?: boolean | patient_info$patient_uploadsArgs<ExtArgs>
    room_register?: boolean | patient_info$room_registerArgs<ExtArgs>
    _count?: boolean | Patient_infoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient_info"]>

  export type patient_infoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    patient_id?: boolean
    patient_name?: boolean
    registered_date?: boolean
    center_id?: boolean
    dicharged_date?: boolean
    is_discharged?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient_info"]>

  export type patient_infoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    patient_id?: boolean
    patient_name?: boolean
    registered_date?: boolean
    center_id?: boolean
    dicharged_date?: boolean
    is_discharged?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient_info"]>

  export type patient_infoSelectScalar = {
    patient_id?: boolean
    patient_name?: boolean
    registered_date?: boolean
    center_id?: boolean
    dicharged_date?: boolean
    is_discharged?: boolean
  }

  export type patient_infoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"patient_id" | "patient_name" | "registered_date" | "center_id" | "dicharged_date" | "is_discharged", ExtArgs["result"]["patient_info"]>
  export type patient_infoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | patient_info$bed_infoArgs<ExtArgs>
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    patient_uploads?: boolean | patient_info$patient_uploadsArgs<ExtArgs>
    room_register?: boolean | patient_info$room_registerArgs<ExtArgs>
    _count?: boolean | Patient_infoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type patient_infoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }
  export type patient_infoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }

  export type $patient_infoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "patient_info"
    objects: {
      bed_info: Prisma.$bed_infoPayload<ExtArgs>[]
      medicalcenter_info: Prisma.$medicalcenter_infoPayload<ExtArgs>
      patient_uploads: Prisma.$patient_uploadsPayload<ExtArgs>[]
      room_register: Prisma.$room_registerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      patient_id: number
      patient_name: string
      registered_date: Date
      center_id: number
      dicharged_date: Date | null
      is_discharged: boolean
    }, ExtArgs["result"]["patient_info"]>
    composites: {}
  }

  type patient_infoGetPayload<S extends boolean | null | undefined | patient_infoDefaultArgs> = $Result.GetResult<Prisma.$patient_infoPayload, S>

  type patient_infoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<patient_infoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Patient_infoCountAggregateInputType | true
    }

  export interface patient_infoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['patient_info'], meta: { name: 'patient_info' } }
    /**
     * Find zero or one Patient_info that matches the filter.
     * @param {patient_infoFindUniqueArgs} args - Arguments to find a Patient_info
     * @example
     * // Get one Patient_info
     * const patient_info = await prisma.patient_info.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends patient_infoFindUniqueArgs>(args: SelectSubset<T, patient_infoFindUniqueArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient_info that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {patient_infoFindUniqueOrThrowArgs} args - Arguments to find a Patient_info
     * @example
     * // Get one Patient_info
     * const patient_info = await prisma.patient_info.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends patient_infoFindUniqueOrThrowArgs>(args: SelectSubset<T, patient_infoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient_info that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_infoFindFirstArgs} args - Arguments to find a Patient_info
     * @example
     * // Get one Patient_info
     * const patient_info = await prisma.patient_info.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends patient_infoFindFirstArgs>(args?: SelectSubset<T, patient_infoFindFirstArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient_info that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_infoFindFirstOrThrowArgs} args - Arguments to find a Patient_info
     * @example
     * // Get one Patient_info
     * const patient_info = await prisma.patient_info.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends patient_infoFindFirstOrThrowArgs>(args?: SelectSubset<T, patient_infoFindFirstOrThrowArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patient_infos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_infoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patient_infos
     * const patient_infos = await prisma.patient_info.findMany()
     * 
     * // Get first 10 Patient_infos
     * const patient_infos = await prisma.patient_info.findMany({ take: 10 })
     * 
     * // Only select the `patient_id`
     * const patient_infoWithPatient_idOnly = await prisma.patient_info.findMany({ select: { patient_id: true } })
     * 
     */
    findMany<T extends patient_infoFindManyArgs>(args?: SelectSubset<T, patient_infoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient_info.
     * @param {patient_infoCreateArgs} args - Arguments to create a Patient_info.
     * @example
     * // Create one Patient_info
     * const Patient_info = await prisma.patient_info.create({
     *   data: {
     *     // ... data to create a Patient_info
     *   }
     * })
     * 
     */
    create<T extends patient_infoCreateArgs>(args: SelectSubset<T, patient_infoCreateArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patient_infos.
     * @param {patient_infoCreateManyArgs} args - Arguments to create many Patient_infos.
     * @example
     * // Create many Patient_infos
     * const patient_info = await prisma.patient_info.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends patient_infoCreateManyArgs>(args?: SelectSubset<T, patient_infoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patient_infos and returns the data saved in the database.
     * @param {patient_infoCreateManyAndReturnArgs} args - Arguments to create many Patient_infos.
     * @example
     * // Create many Patient_infos
     * const patient_info = await prisma.patient_info.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patient_infos and only return the `patient_id`
     * const patient_infoWithPatient_idOnly = await prisma.patient_info.createManyAndReturn({
     *   select: { patient_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends patient_infoCreateManyAndReturnArgs>(args?: SelectSubset<T, patient_infoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient_info.
     * @param {patient_infoDeleteArgs} args - Arguments to delete one Patient_info.
     * @example
     * // Delete one Patient_info
     * const Patient_info = await prisma.patient_info.delete({
     *   where: {
     *     // ... filter to delete one Patient_info
     *   }
     * })
     * 
     */
    delete<T extends patient_infoDeleteArgs>(args: SelectSubset<T, patient_infoDeleteArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient_info.
     * @param {patient_infoUpdateArgs} args - Arguments to update one Patient_info.
     * @example
     * // Update one Patient_info
     * const patient_info = await prisma.patient_info.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends patient_infoUpdateArgs>(args: SelectSubset<T, patient_infoUpdateArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patient_infos.
     * @param {patient_infoDeleteManyArgs} args - Arguments to filter Patient_infos to delete.
     * @example
     * // Delete a few Patient_infos
     * const { count } = await prisma.patient_info.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends patient_infoDeleteManyArgs>(args?: SelectSubset<T, patient_infoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patient_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_infoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patient_infos
     * const patient_info = await prisma.patient_info.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends patient_infoUpdateManyArgs>(args: SelectSubset<T, patient_infoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patient_infos and returns the data updated in the database.
     * @param {patient_infoUpdateManyAndReturnArgs} args - Arguments to update many Patient_infos.
     * @example
     * // Update many Patient_infos
     * const patient_info = await prisma.patient_info.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patient_infos and only return the `patient_id`
     * const patient_infoWithPatient_idOnly = await prisma.patient_info.updateManyAndReturn({
     *   select: { patient_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends patient_infoUpdateManyAndReturnArgs>(args: SelectSubset<T, patient_infoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient_info.
     * @param {patient_infoUpsertArgs} args - Arguments to update or create a Patient_info.
     * @example
     * // Update or create a Patient_info
     * const patient_info = await prisma.patient_info.upsert({
     *   create: {
     *     // ... data to create a Patient_info
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient_info we want to update
     *   }
     * })
     */
    upsert<T extends patient_infoUpsertArgs>(args: SelectSubset<T, patient_infoUpsertArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patient_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_infoCountArgs} args - Arguments to filter Patient_infos to count.
     * @example
     * // Count the number of Patient_infos
     * const count = await prisma.patient_info.count({
     *   where: {
     *     // ... the filter for the Patient_infos we want to count
     *   }
     * })
    **/
    count<T extends patient_infoCountArgs>(
      args?: Subset<T, patient_infoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Patient_infoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Patient_infoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Patient_infoAggregateArgs>(args: Subset<T, Patient_infoAggregateArgs>): Prisma.PrismaPromise<GetPatient_infoAggregateType<T>>

    /**
     * Group by Patient_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_infoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends patient_infoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: patient_infoGroupByArgs['orderBy'] }
        : { orderBy?: patient_infoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, patient_infoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatient_infoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the patient_info model
   */
  readonly fields: patient_infoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for patient_info.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__patient_infoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bed_info<T extends patient_info$bed_infoArgs<ExtArgs> = {}>(args?: Subset<T, patient_info$bed_infoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicalcenter_info<T extends medicalcenter_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_infoDefaultArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient_uploads<T extends patient_info$patient_uploadsArgs<ExtArgs> = {}>(args?: Subset<T, patient_info$patient_uploadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    room_register<T extends patient_info$room_registerArgs<ExtArgs> = {}>(args?: Subset<T, patient_info$room_registerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the patient_info model
   */
  interface patient_infoFieldRefs {
    readonly patient_id: FieldRef<"patient_info", 'Int'>
    readonly patient_name: FieldRef<"patient_info", 'String'>
    readonly registered_date: FieldRef<"patient_info", 'DateTime'>
    readonly center_id: FieldRef<"patient_info", 'Int'>
    readonly dicharged_date: FieldRef<"patient_info", 'DateTime'>
    readonly is_discharged: FieldRef<"patient_info", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * patient_info findUnique
   */
  export type patient_infoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * Filter, which patient_info to fetch.
     */
    where: patient_infoWhereUniqueInput
  }

  /**
   * patient_info findUniqueOrThrow
   */
  export type patient_infoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * Filter, which patient_info to fetch.
     */
    where: patient_infoWhereUniqueInput
  }

  /**
   * patient_info findFirst
   */
  export type patient_infoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * Filter, which patient_info to fetch.
     */
    where?: patient_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of patient_infos to fetch.
     */
    orderBy?: patient_infoOrderByWithRelationInput | patient_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for patient_infos.
     */
    cursor?: patient_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` patient_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` patient_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of patient_infos.
     */
    distinct?: Patient_infoScalarFieldEnum | Patient_infoScalarFieldEnum[]
  }

  /**
   * patient_info findFirstOrThrow
   */
  export type patient_infoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * Filter, which patient_info to fetch.
     */
    where?: patient_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of patient_infos to fetch.
     */
    orderBy?: patient_infoOrderByWithRelationInput | patient_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for patient_infos.
     */
    cursor?: patient_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` patient_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` patient_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of patient_infos.
     */
    distinct?: Patient_infoScalarFieldEnum | Patient_infoScalarFieldEnum[]
  }

  /**
   * patient_info findMany
   */
  export type patient_infoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * Filter, which patient_infos to fetch.
     */
    where?: patient_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of patient_infos to fetch.
     */
    orderBy?: patient_infoOrderByWithRelationInput | patient_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing patient_infos.
     */
    cursor?: patient_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` patient_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` patient_infos.
     */
    skip?: number
    distinct?: Patient_infoScalarFieldEnum | Patient_infoScalarFieldEnum[]
  }

  /**
   * patient_info create
   */
  export type patient_infoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * The data needed to create a patient_info.
     */
    data: XOR<patient_infoCreateInput, patient_infoUncheckedCreateInput>
  }

  /**
   * patient_info createMany
   */
  export type patient_infoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many patient_infos.
     */
    data: patient_infoCreateManyInput | patient_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * patient_info createManyAndReturn
   */
  export type patient_infoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * The data used to create many patient_infos.
     */
    data: patient_infoCreateManyInput | patient_infoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * patient_info update
   */
  export type patient_infoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * The data needed to update a patient_info.
     */
    data: XOR<patient_infoUpdateInput, patient_infoUncheckedUpdateInput>
    /**
     * Choose, which patient_info to update.
     */
    where: patient_infoWhereUniqueInput
  }

  /**
   * patient_info updateMany
   */
  export type patient_infoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update patient_infos.
     */
    data: XOR<patient_infoUpdateManyMutationInput, patient_infoUncheckedUpdateManyInput>
    /**
     * Filter which patient_infos to update
     */
    where?: patient_infoWhereInput
    /**
     * Limit how many patient_infos to update.
     */
    limit?: number
  }

  /**
   * patient_info updateManyAndReturn
   */
  export type patient_infoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * The data used to update patient_infos.
     */
    data: XOR<patient_infoUpdateManyMutationInput, patient_infoUncheckedUpdateManyInput>
    /**
     * Filter which patient_infos to update
     */
    where?: patient_infoWhereInput
    /**
     * Limit how many patient_infos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * patient_info upsert
   */
  export type patient_infoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * The filter to search for the patient_info to update in case it exists.
     */
    where: patient_infoWhereUniqueInput
    /**
     * In case the patient_info found by the `where` argument doesn't exist, create a new patient_info with this data.
     */
    create: XOR<patient_infoCreateInput, patient_infoUncheckedCreateInput>
    /**
     * In case the patient_info was found with the provided `where` argument, update it with this data.
     */
    update: XOR<patient_infoUpdateInput, patient_infoUncheckedUpdateInput>
  }

  /**
   * patient_info delete
   */
  export type patient_infoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    /**
     * Filter which patient_info to delete.
     */
    where: patient_infoWhereUniqueInput
  }

  /**
   * patient_info deleteMany
   */
  export type patient_infoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which patient_infos to delete
     */
    where?: patient_infoWhereInput
    /**
     * Limit how many patient_infos to delete.
     */
    limit?: number
  }

  /**
   * patient_info.bed_info
   */
  export type patient_info$bed_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    where?: bed_infoWhereInput
    orderBy?: bed_infoOrderByWithRelationInput | bed_infoOrderByWithRelationInput[]
    cursor?: bed_infoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Bed_infoScalarFieldEnum | Bed_infoScalarFieldEnum[]
  }

  /**
   * patient_info.patient_uploads
   */
  export type patient_info$patient_uploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    where?: patient_uploadsWhereInput
    orderBy?: patient_uploadsOrderByWithRelationInput | patient_uploadsOrderByWithRelationInput[]
    cursor?: patient_uploadsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Patient_uploadsScalarFieldEnum | Patient_uploadsScalarFieldEnum[]
  }

  /**
   * patient_info.room_register
   */
  export type patient_info$room_registerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    where?: room_registerWhereInput
    orderBy?: room_registerOrderByWithRelationInput | room_registerOrderByWithRelationInput[]
    cursor?: room_registerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Room_registerScalarFieldEnum | Room_registerScalarFieldEnum[]
  }

  /**
   * patient_info without action
   */
  export type patient_infoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
  }


  /**
   * Model patient_uploads
   */

  export type AggregatePatient_uploads = {
    _count: Patient_uploadsCountAggregateOutputType | null
    _avg: Patient_uploadsAvgAggregateOutputType | null
    _sum: Patient_uploadsSumAggregateOutputType | null
    _min: Patient_uploadsMinAggregateOutputType | null
    _max: Patient_uploadsMaxAggregateOutputType | null
  }

  export type Patient_uploadsAvgAggregateOutputType = {
    patient_id: number | null
    session_id: number | null
  }

  export type Patient_uploadsSumAggregateOutputType = {
    patient_id: number | null
    session_id: number | null
  }

  export type Patient_uploadsMinAggregateOutputType = {
    patient_id: number | null
    session_id: number | null
    upload_path: string | null
    patient_notes: string | null
    upload_time: Date | null
  }

  export type Patient_uploadsMaxAggregateOutputType = {
    patient_id: number | null
    session_id: number | null
    upload_path: string | null
    patient_notes: string | null
    upload_time: Date | null
  }

  export type Patient_uploadsCountAggregateOutputType = {
    patient_id: number
    session_id: number
    upload_path: number
    patient_notes: number
    upload_time: number
    _all: number
  }


  export type Patient_uploadsAvgAggregateInputType = {
    patient_id?: true
    session_id?: true
  }

  export type Patient_uploadsSumAggregateInputType = {
    patient_id?: true
    session_id?: true
  }

  export type Patient_uploadsMinAggregateInputType = {
    patient_id?: true
    session_id?: true
    upload_path?: true
    patient_notes?: true
    upload_time?: true
  }

  export type Patient_uploadsMaxAggregateInputType = {
    patient_id?: true
    session_id?: true
    upload_path?: true
    patient_notes?: true
    upload_time?: true
  }

  export type Patient_uploadsCountAggregateInputType = {
    patient_id?: true
    session_id?: true
    upload_path?: true
    patient_notes?: true
    upload_time?: true
    _all?: true
  }

  export type Patient_uploadsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which patient_uploads to aggregate.
     */
    where?: patient_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of patient_uploads to fetch.
     */
    orderBy?: patient_uploadsOrderByWithRelationInput | patient_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: patient_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` patient_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` patient_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned patient_uploads
    **/
    _count?: true | Patient_uploadsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Patient_uploadsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Patient_uploadsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Patient_uploadsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Patient_uploadsMaxAggregateInputType
  }

  export type GetPatient_uploadsAggregateType<T extends Patient_uploadsAggregateArgs> = {
        [P in keyof T & keyof AggregatePatient_uploads]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePatient_uploads[P]>
      : GetScalarType<T[P], AggregatePatient_uploads[P]>
  }




  export type patient_uploadsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: patient_uploadsWhereInput
    orderBy?: patient_uploadsOrderByWithAggregationInput | patient_uploadsOrderByWithAggregationInput[]
    by: Patient_uploadsScalarFieldEnum[] | Patient_uploadsScalarFieldEnum
    having?: patient_uploadsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Patient_uploadsCountAggregateInputType | true
    _avg?: Patient_uploadsAvgAggregateInputType
    _sum?: Patient_uploadsSumAggregateInputType
    _min?: Patient_uploadsMinAggregateInputType
    _max?: Patient_uploadsMaxAggregateInputType
  }

  export type Patient_uploadsGroupByOutputType = {
    patient_id: number
    session_id: number
    upload_path: string
    patient_notes: string
    upload_time: Date
    _count: Patient_uploadsCountAggregateOutputType | null
    _avg: Patient_uploadsAvgAggregateOutputType | null
    _sum: Patient_uploadsSumAggregateOutputType | null
    _min: Patient_uploadsMinAggregateOutputType | null
    _max: Patient_uploadsMaxAggregateOutputType | null
  }

  type GetPatient_uploadsGroupByPayload<T extends patient_uploadsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Patient_uploadsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Patient_uploadsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Patient_uploadsGroupByOutputType[P]>
            : GetScalarType<T[P], Patient_uploadsGroupByOutputType[P]>
        }
      >
    >


  export type patient_uploadsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    patient_id?: boolean
    session_id?: boolean
    upload_path?: boolean
    patient_notes?: boolean
    upload_time?: boolean
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient_uploads"]>

  export type patient_uploadsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    patient_id?: boolean
    session_id?: boolean
    upload_path?: boolean
    patient_notes?: boolean
    upload_time?: boolean
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient_uploads"]>

  export type patient_uploadsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    patient_id?: boolean
    session_id?: boolean
    upload_path?: boolean
    patient_notes?: boolean
    upload_time?: boolean
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["patient_uploads"]>

  export type patient_uploadsSelectScalar = {
    patient_id?: boolean
    session_id?: boolean
    upload_path?: boolean
    patient_notes?: boolean
    upload_time?: boolean
  }

  export type patient_uploadsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"patient_id" | "session_id" | "upload_path" | "patient_notes" | "upload_time", ExtArgs["result"]["patient_uploads"]>
  export type patient_uploadsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
  }
  export type patient_uploadsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
  }
  export type patient_uploadsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
  }

  export type $patient_uploadsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "patient_uploads"
    objects: {
      patient_info: Prisma.$patient_infoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      patient_id: number
      session_id: number
      upload_path: string
      patient_notes: string
      upload_time: Date
    }, ExtArgs["result"]["patient_uploads"]>
    composites: {}
  }

  type patient_uploadsGetPayload<S extends boolean | null | undefined | patient_uploadsDefaultArgs> = $Result.GetResult<Prisma.$patient_uploadsPayload, S>

  type patient_uploadsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<patient_uploadsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Patient_uploadsCountAggregateInputType | true
    }

  export interface patient_uploadsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['patient_uploads'], meta: { name: 'patient_uploads' } }
    /**
     * Find zero or one Patient_uploads that matches the filter.
     * @param {patient_uploadsFindUniqueArgs} args - Arguments to find a Patient_uploads
     * @example
     * // Get one Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends patient_uploadsFindUniqueArgs>(args: SelectSubset<T, patient_uploadsFindUniqueArgs<ExtArgs>>): Prisma__patient_uploadsClient<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Patient_uploads that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {patient_uploadsFindUniqueOrThrowArgs} args - Arguments to find a Patient_uploads
     * @example
     * // Get one Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends patient_uploadsFindUniqueOrThrowArgs>(args: SelectSubset<T, patient_uploadsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__patient_uploadsClient<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient_uploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_uploadsFindFirstArgs} args - Arguments to find a Patient_uploads
     * @example
     * // Get one Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends patient_uploadsFindFirstArgs>(args?: SelectSubset<T, patient_uploadsFindFirstArgs<ExtArgs>>): Prisma__patient_uploadsClient<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Patient_uploads that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_uploadsFindFirstOrThrowArgs} args - Arguments to find a Patient_uploads
     * @example
     * // Get one Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends patient_uploadsFindFirstOrThrowArgs>(args?: SelectSubset<T, patient_uploadsFindFirstOrThrowArgs<ExtArgs>>): Prisma__patient_uploadsClient<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Patient_uploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_uploadsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.findMany()
     * 
     * // Get first 10 Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.findMany({ take: 10 })
     * 
     * // Only select the `patient_id`
     * const patient_uploadsWithPatient_idOnly = await prisma.patient_uploads.findMany({ select: { patient_id: true } })
     * 
     */
    findMany<T extends patient_uploadsFindManyArgs>(args?: SelectSubset<T, patient_uploadsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Patient_uploads.
     * @param {patient_uploadsCreateArgs} args - Arguments to create a Patient_uploads.
     * @example
     * // Create one Patient_uploads
     * const Patient_uploads = await prisma.patient_uploads.create({
     *   data: {
     *     // ... data to create a Patient_uploads
     *   }
     * })
     * 
     */
    create<T extends patient_uploadsCreateArgs>(args: SelectSubset<T, patient_uploadsCreateArgs<ExtArgs>>): Prisma__patient_uploadsClient<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Patient_uploads.
     * @param {patient_uploadsCreateManyArgs} args - Arguments to create many Patient_uploads.
     * @example
     * // Create many Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends patient_uploadsCreateManyArgs>(args?: SelectSubset<T, patient_uploadsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Patient_uploads and returns the data saved in the database.
     * @param {patient_uploadsCreateManyAndReturnArgs} args - Arguments to create many Patient_uploads.
     * @example
     * // Create many Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Patient_uploads and only return the `patient_id`
     * const patient_uploadsWithPatient_idOnly = await prisma.patient_uploads.createManyAndReturn({
     *   select: { patient_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends patient_uploadsCreateManyAndReturnArgs>(args?: SelectSubset<T, patient_uploadsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Patient_uploads.
     * @param {patient_uploadsDeleteArgs} args - Arguments to delete one Patient_uploads.
     * @example
     * // Delete one Patient_uploads
     * const Patient_uploads = await prisma.patient_uploads.delete({
     *   where: {
     *     // ... filter to delete one Patient_uploads
     *   }
     * })
     * 
     */
    delete<T extends patient_uploadsDeleteArgs>(args: SelectSubset<T, patient_uploadsDeleteArgs<ExtArgs>>): Prisma__patient_uploadsClient<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Patient_uploads.
     * @param {patient_uploadsUpdateArgs} args - Arguments to update one Patient_uploads.
     * @example
     * // Update one Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends patient_uploadsUpdateArgs>(args: SelectSubset<T, patient_uploadsUpdateArgs<ExtArgs>>): Prisma__patient_uploadsClient<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Patient_uploads.
     * @param {patient_uploadsDeleteManyArgs} args - Arguments to filter Patient_uploads to delete.
     * @example
     * // Delete a few Patient_uploads
     * const { count } = await prisma.patient_uploads.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends patient_uploadsDeleteManyArgs>(args?: SelectSubset<T, patient_uploadsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patient_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_uploadsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends patient_uploadsUpdateManyArgs>(args: SelectSubset<T, patient_uploadsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Patient_uploads and returns the data updated in the database.
     * @param {patient_uploadsUpdateManyAndReturnArgs} args - Arguments to update many Patient_uploads.
     * @example
     * // Update many Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Patient_uploads and only return the `patient_id`
     * const patient_uploadsWithPatient_idOnly = await prisma.patient_uploads.updateManyAndReturn({
     *   select: { patient_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends patient_uploadsUpdateManyAndReturnArgs>(args: SelectSubset<T, patient_uploadsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Patient_uploads.
     * @param {patient_uploadsUpsertArgs} args - Arguments to update or create a Patient_uploads.
     * @example
     * // Update or create a Patient_uploads
     * const patient_uploads = await prisma.patient_uploads.upsert({
     *   create: {
     *     // ... data to create a Patient_uploads
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Patient_uploads we want to update
     *   }
     * })
     */
    upsert<T extends patient_uploadsUpsertArgs>(args: SelectSubset<T, patient_uploadsUpsertArgs<ExtArgs>>): Prisma__patient_uploadsClient<$Result.GetResult<Prisma.$patient_uploadsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Patient_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_uploadsCountArgs} args - Arguments to filter Patient_uploads to count.
     * @example
     * // Count the number of Patient_uploads
     * const count = await prisma.patient_uploads.count({
     *   where: {
     *     // ... the filter for the Patient_uploads we want to count
     *   }
     * })
    **/
    count<T extends patient_uploadsCountArgs>(
      args?: Subset<T, patient_uploadsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Patient_uploadsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Patient_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Patient_uploadsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Patient_uploadsAggregateArgs>(args: Subset<T, Patient_uploadsAggregateArgs>): Prisma.PrismaPromise<GetPatient_uploadsAggregateType<T>>

    /**
     * Group by Patient_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {patient_uploadsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends patient_uploadsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: patient_uploadsGroupByArgs['orderBy'] }
        : { orderBy?: patient_uploadsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, patient_uploadsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPatient_uploadsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the patient_uploads model
   */
  readonly fields: patient_uploadsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for patient_uploads.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__patient_uploadsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    patient_info<T extends patient_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, patient_infoDefaultArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the patient_uploads model
   */
  interface patient_uploadsFieldRefs {
    readonly patient_id: FieldRef<"patient_uploads", 'Int'>
    readonly session_id: FieldRef<"patient_uploads", 'Int'>
    readonly upload_path: FieldRef<"patient_uploads", 'String'>
    readonly patient_notes: FieldRef<"patient_uploads", 'String'>
    readonly upload_time: FieldRef<"patient_uploads", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * patient_uploads findUnique
   */
  export type patient_uploadsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which patient_uploads to fetch.
     */
    where: patient_uploadsWhereUniqueInput
  }

  /**
   * patient_uploads findUniqueOrThrow
   */
  export type patient_uploadsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which patient_uploads to fetch.
     */
    where: patient_uploadsWhereUniqueInput
  }

  /**
   * patient_uploads findFirst
   */
  export type patient_uploadsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which patient_uploads to fetch.
     */
    where?: patient_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of patient_uploads to fetch.
     */
    orderBy?: patient_uploadsOrderByWithRelationInput | patient_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for patient_uploads.
     */
    cursor?: patient_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` patient_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` patient_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of patient_uploads.
     */
    distinct?: Patient_uploadsScalarFieldEnum | Patient_uploadsScalarFieldEnum[]
  }

  /**
   * patient_uploads findFirstOrThrow
   */
  export type patient_uploadsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which patient_uploads to fetch.
     */
    where?: patient_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of patient_uploads to fetch.
     */
    orderBy?: patient_uploadsOrderByWithRelationInput | patient_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for patient_uploads.
     */
    cursor?: patient_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` patient_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` patient_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of patient_uploads.
     */
    distinct?: Patient_uploadsScalarFieldEnum | Patient_uploadsScalarFieldEnum[]
  }

  /**
   * patient_uploads findMany
   */
  export type patient_uploadsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which patient_uploads to fetch.
     */
    where?: patient_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of patient_uploads to fetch.
     */
    orderBy?: patient_uploadsOrderByWithRelationInput | patient_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing patient_uploads.
     */
    cursor?: patient_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` patient_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` patient_uploads.
     */
    skip?: number
    distinct?: Patient_uploadsScalarFieldEnum | Patient_uploadsScalarFieldEnum[]
  }

  /**
   * patient_uploads create
   */
  export type patient_uploadsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * The data needed to create a patient_uploads.
     */
    data: XOR<patient_uploadsCreateInput, patient_uploadsUncheckedCreateInput>
  }

  /**
   * patient_uploads createMany
   */
  export type patient_uploadsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many patient_uploads.
     */
    data: patient_uploadsCreateManyInput | patient_uploadsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * patient_uploads createManyAndReturn
   */
  export type patient_uploadsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * The data used to create many patient_uploads.
     */
    data: patient_uploadsCreateManyInput | patient_uploadsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * patient_uploads update
   */
  export type patient_uploadsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * The data needed to update a patient_uploads.
     */
    data: XOR<patient_uploadsUpdateInput, patient_uploadsUncheckedUpdateInput>
    /**
     * Choose, which patient_uploads to update.
     */
    where: patient_uploadsWhereUniqueInput
  }

  /**
   * patient_uploads updateMany
   */
  export type patient_uploadsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update patient_uploads.
     */
    data: XOR<patient_uploadsUpdateManyMutationInput, patient_uploadsUncheckedUpdateManyInput>
    /**
     * Filter which patient_uploads to update
     */
    where?: patient_uploadsWhereInput
    /**
     * Limit how many patient_uploads to update.
     */
    limit?: number
  }

  /**
   * patient_uploads updateManyAndReturn
   */
  export type patient_uploadsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * The data used to update patient_uploads.
     */
    data: XOR<patient_uploadsUpdateManyMutationInput, patient_uploadsUncheckedUpdateManyInput>
    /**
     * Filter which patient_uploads to update
     */
    where?: patient_uploadsWhereInput
    /**
     * Limit how many patient_uploads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * patient_uploads upsert
   */
  export type patient_uploadsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * The filter to search for the patient_uploads to update in case it exists.
     */
    where: patient_uploadsWhereUniqueInput
    /**
     * In case the patient_uploads found by the `where` argument doesn't exist, create a new patient_uploads with this data.
     */
    create: XOR<patient_uploadsCreateInput, patient_uploadsUncheckedCreateInput>
    /**
     * In case the patient_uploads was found with the provided `where` argument, update it with this data.
     */
    update: XOR<patient_uploadsUpdateInput, patient_uploadsUncheckedUpdateInput>
  }

  /**
   * patient_uploads delete
   */
  export type patient_uploadsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
    /**
     * Filter which patient_uploads to delete.
     */
    where: patient_uploadsWhereUniqueInput
  }

  /**
   * patient_uploads deleteMany
   */
  export type patient_uploadsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which patient_uploads to delete
     */
    where?: patient_uploadsWhereInput
    /**
     * Limit how many patient_uploads to delete.
     */
    limit?: number
  }

  /**
   * patient_uploads without action
   */
  export type patient_uploadsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_uploads
     */
    select?: patient_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_uploads
     */
    omit?: patient_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_uploadsInclude<ExtArgs> | null
  }


  /**
   * Model room_info
   */

  export type AggregateRoom_info = {
    _count: Room_infoCountAggregateOutputType | null
    _avg: Room_infoAvgAggregateOutputType | null
    _sum: Room_infoSumAggregateOutputType | null
    _min: Room_infoMinAggregateOutputType | null
    _max: Room_infoMaxAggregateOutputType | null
  }

  export type Room_infoAvgAggregateOutputType = {
    room_id: number | null
    room_number: number | null
    center_id: number | null
    number_of_beds: number | null
  }

  export type Room_infoSumAggregateOutputType = {
    room_id: number | null
    room_number: number | null
    center_id: number | null
    number_of_beds: number | null
  }

  export type Room_infoMinAggregateOutputType = {
    room_id: number | null
    room_number: number | null
    center_id: number | null
    number_of_beds: number | null
    is_full: boolean | null
  }

  export type Room_infoMaxAggregateOutputType = {
    room_id: number | null
    room_number: number | null
    center_id: number | null
    number_of_beds: number | null
    is_full: boolean | null
  }

  export type Room_infoCountAggregateOutputType = {
    room_id: number
    room_number: number
    center_id: number
    number_of_beds: number
    is_full: number
    _all: number
  }


  export type Room_infoAvgAggregateInputType = {
    room_id?: true
    room_number?: true
    center_id?: true
    number_of_beds?: true
  }

  export type Room_infoSumAggregateInputType = {
    room_id?: true
    room_number?: true
    center_id?: true
    number_of_beds?: true
  }

  export type Room_infoMinAggregateInputType = {
    room_id?: true
    room_number?: true
    center_id?: true
    number_of_beds?: true
    is_full?: true
  }

  export type Room_infoMaxAggregateInputType = {
    room_id?: true
    room_number?: true
    center_id?: true
    number_of_beds?: true
    is_full?: true
  }

  export type Room_infoCountAggregateInputType = {
    room_id?: true
    room_number?: true
    center_id?: true
    number_of_beds?: true
    is_full?: true
    _all?: true
  }

  export type Room_infoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_info to aggregate.
     */
    where?: room_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_infos to fetch.
     */
    orderBy?: room_infoOrderByWithRelationInput | room_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: room_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned room_infos
    **/
    _count?: true | Room_infoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Room_infoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Room_infoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Room_infoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Room_infoMaxAggregateInputType
  }

  export type GetRoom_infoAggregateType<T extends Room_infoAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom_info]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom_info[P]>
      : GetScalarType<T[P], AggregateRoom_info[P]>
  }




  export type room_infoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_infoWhereInput
    orderBy?: room_infoOrderByWithAggregationInput | room_infoOrderByWithAggregationInput[]
    by: Room_infoScalarFieldEnum[] | Room_infoScalarFieldEnum
    having?: room_infoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Room_infoCountAggregateInputType | true
    _avg?: Room_infoAvgAggregateInputType
    _sum?: Room_infoSumAggregateInputType
    _min?: Room_infoMinAggregateInputType
    _max?: Room_infoMaxAggregateInputType
  }

  export type Room_infoGroupByOutputType = {
    room_id: number
    room_number: number
    center_id: number
    number_of_beds: number
    is_full: boolean
    _count: Room_infoCountAggregateOutputType | null
    _avg: Room_infoAvgAggregateOutputType | null
    _sum: Room_infoSumAggregateOutputType | null
    _min: Room_infoMinAggregateOutputType | null
    _max: Room_infoMaxAggregateOutputType | null
  }

  type GetRoom_infoGroupByPayload<T extends room_infoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Room_infoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Room_infoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Room_infoGroupByOutputType[P]>
            : GetScalarType<T[P], Room_infoGroupByOutputType[P]>
        }
      >
    >


  export type room_infoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    room_number?: boolean
    center_id?: boolean
    number_of_beds?: boolean
    is_full?: boolean
    bed_info?: boolean | room_info$bed_infoArgs<ExtArgs>
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    room_register?: boolean | room_info$room_registerArgs<ExtArgs>
    _count?: boolean | Room_infoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_info"]>

  export type room_infoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    room_number?: boolean
    center_id?: boolean
    number_of_beds?: boolean
    is_full?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_info"]>

  export type room_infoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    room_number?: boolean
    center_id?: boolean
    number_of_beds?: boolean
    is_full?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_info"]>

  export type room_infoSelectScalar = {
    room_id?: boolean
    room_number?: boolean
    center_id?: boolean
    number_of_beds?: boolean
    is_full?: boolean
  }

  export type room_infoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"room_id" | "room_number" | "center_id" | "number_of_beds" | "is_full", ExtArgs["result"]["room_info"]>
  export type room_infoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | room_info$bed_infoArgs<ExtArgs>
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    room_register?: boolean | room_info$room_registerArgs<ExtArgs>
    _count?: boolean | Room_infoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type room_infoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }
  export type room_infoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }

  export type $room_infoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "room_info"
    objects: {
      bed_info: Prisma.$bed_infoPayload<ExtArgs>[]
      medicalcenter_info: Prisma.$medicalcenter_infoPayload<ExtArgs>
      room_register: Prisma.$room_registerPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      room_id: number
      room_number: number
      center_id: number
      number_of_beds: number
      is_full: boolean
    }, ExtArgs["result"]["room_info"]>
    composites: {}
  }

  type room_infoGetPayload<S extends boolean | null | undefined | room_infoDefaultArgs> = $Result.GetResult<Prisma.$room_infoPayload, S>

  type room_infoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<room_infoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Room_infoCountAggregateInputType | true
    }

  export interface room_infoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['room_info'], meta: { name: 'room_info' } }
    /**
     * Find zero or one Room_info that matches the filter.
     * @param {room_infoFindUniqueArgs} args - Arguments to find a Room_info
     * @example
     * // Get one Room_info
     * const room_info = await prisma.room_info.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends room_infoFindUniqueArgs>(args: SelectSubset<T, room_infoFindUniqueArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room_info that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {room_infoFindUniqueOrThrowArgs} args - Arguments to find a Room_info
     * @example
     * // Get one Room_info
     * const room_info = await prisma.room_info.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends room_infoFindUniqueOrThrowArgs>(args: SelectSubset<T, room_infoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_info that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_infoFindFirstArgs} args - Arguments to find a Room_info
     * @example
     * // Get one Room_info
     * const room_info = await prisma.room_info.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends room_infoFindFirstArgs>(args?: SelectSubset<T, room_infoFindFirstArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_info that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_infoFindFirstOrThrowArgs} args - Arguments to find a Room_info
     * @example
     * // Get one Room_info
     * const room_info = await prisma.room_info.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends room_infoFindFirstOrThrowArgs>(args?: SelectSubset<T, room_infoFindFirstOrThrowArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Room_infos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_infoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Room_infos
     * const room_infos = await prisma.room_info.findMany()
     * 
     * // Get first 10 Room_infos
     * const room_infos = await prisma.room_info.findMany({ take: 10 })
     * 
     * // Only select the `room_id`
     * const room_infoWithRoom_idOnly = await prisma.room_info.findMany({ select: { room_id: true } })
     * 
     */
    findMany<T extends room_infoFindManyArgs>(args?: SelectSubset<T, room_infoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room_info.
     * @param {room_infoCreateArgs} args - Arguments to create a Room_info.
     * @example
     * // Create one Room_info
     * const Room_info = await prisma.room_info.create({
     *   data: {
     *     // ... data to create a Room_info
     *   }
     * })
     * 
     */
    create<T extends room_infoCreateArgs>(args: SelectSubset<T, room_infoCreateArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Room_infos.
     * @param {room_infoCreateManyArgs} args - Arguments to create many Room_infos.
     * @example
     * // Create many Room_infos
     * const room_info = await prisma.room_info.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends room_infoCreateManyArgs>(args?: SelectSubset<T, room_infoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Room_infos and returns the data saved in the database.
     * @param {room_infoCreateManyAndReturnArgs} args - Arguments to create many Room_infos.
     * @example
     * // Create many Room_infos
     * const room_info = await prisma.room_info.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Room_infos and only return the `room_id`
     * const room_infoWithRoom_idOnly = await prisma.room_info.createManyAndReturn({
     *   select: { room_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends room_infoCreateManyAndReturnArgs>(args?: SelectSubset<T, room_infoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room_info.
     * @param {room_infoDeleteArgs} args - Arguments to delete one Room_info.
     * @example
     * // Delete one Room_info
     * const Room_info = await prisma.room_info.delete({
     *   where: {
     *     // ... filter to delete one Room_info
     *   }
     * })
     * 
     */
    delete<T extends room_infoDeleteArgs>(args: SelectSubset<T, room_infoDeleteArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room_info.
     * @param {room_infoUpdateArgs} args - Arguments to update one Room_info.
     * @example
     * // Update one Room_info
     * const room_info = await prisma.room_info.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends room_infoUpdateArgs>(args: SelectSubset<T, room_infoUpdateArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Room_infos.
     * @param {room_infoDeleteManyArgs} args - Arguments to filter Room_infos to delete.
     * @example
     * // Delete a few Room_infos
     * const { count } = await prisma.room_info.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends room_infoDeleteManyArgs>(args?: SelectSubset<T, room_infoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_infoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Room_infos
     * const room_info = await prisma.room_info.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends room_infoUpdateManyArgs>(args: SelectSubset<T, room_infoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_infos and returns the data updated in the database.
     * @param {room_infoUpdateManyAndReturnArgs} args - Arguments to update many Room_infos.
     * @example
     * // Update many Room_infos
     * const room_info = await prisma.room_info.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Room_infos and only return the `room_id`
     * const room_infoWithRoom_idOnly = await prisma.room_info.updateManyAndReturn({
     *   select: { room_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends room_infoUpdateManyAndReturnArgs>(args: SelectSubset<T, room_infoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room_info.
     * @param {room_infoUpsertArgs} args - Arguments to update or create a Room_info.
     * @example
     * // Update or create a Room_info
     * const room_info = await prisma.room_info.upsert({
     *   create: {
     *     // ... data to create a Room_info
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room_info we want to update
     *   }
     * })
     */
    upsert<T extends room_infoUpsertArgs>(args: SelectSubset<T, room_infoUpsertArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Room_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_infoCountArgs} args - Arguments to filter Room_infos to count.
     * @example
     * // Count the number of Room_infos
     * const count = await prisma.room_info.count({
     *   where: {
     *     // ... the filter for the Room_infos we want to count
     *   }
     * })
    **/
    count<T extends room_infoCountArgs>(
      args?: Subset<T, room_infoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Room_infoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Room_infoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Room_infoAggregateArgs>(args: Subset<T, Room_infoAggregateArgs>): Prisma.PrismaPromise<GetRoom_infoAggregateType<T>>

    /**
     * Group by Room_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_infoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends room_infoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: room_infoGroupByArgs['orderBy'] }
        : { orderBy?: room_infoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, room_infoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoom_infoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the room_info model
   */
  readonly fields: room_infoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for room_info.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__room_infoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bed_info<T extends room_info$bed_infoArgs<ExtArgs> = {}>(args?: Subset<T, room_info$bed_infoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicalcenter_info<T extends medicalcenter_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_infoDefaultArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room_register<T extends room_info$room_registerArgs<ExtArgs> = {}>(args?: Subset<T, room_info$room_registerArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the room_info model
   */
  interface room_infoFieldRefs {
    readonly room_id: FieldRef<"room_info", 'Int'>
    readonly room_number: FieldRef<"room_info", 'Int'>
    readonly center_id: FieldRef<"room_info", 'Int'>
    readonly number_of_beds: FieldRef<"room_info", 'Int'>
    readonly is_full: FieldRef<"room_info", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * room_info findUnique
   */
  export type room_infoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * Filter, which room_info to fetch.
     */
    where: room_infoWhereUniqueInput
  }

  /**
   * room_info findUniqueOrThrow
   */
  export type room_infoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * Filter, which room_info to fetch.
     */
    where: room_infoWhereUniqueInput
  }

  /**
   * room_info findFirst
   */
  export type room_infoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * Filter, which room_info to fetch.
     */
    where?: room_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_infos to fetch.
     */
    orderBy?: room_infoOrderByWithRelationInput | room_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_infos.
     */
    cursor?: room_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_infos.
     */
    distinct?: Room_infoScalarFieldEnum | Room_infoScalarFieldEnum[]
  }

  /**
   * room_info findFirstOrThrow
   */
  export type room_infoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * Filter, which room_info to fetch.
     */
    where?: room_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_infos to fetch.
     */
    orderBy?: room_infoOrderByWithRelationInput | room_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_infos.
     */
    cursor?: room_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_infos.
     */
    distinct?: Room_infoScalarFieldEnum | Room_infoScalarFieldEnum[]
  }

  /**
   * room_info findMany
   */
  export type room_infoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * Filter, which room_infos to fetch.
     */
    where?: room_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_infos to fetch.
     */
    orderBy?: room_infoOrderByWithRelationInput | room_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing room_infos.
     */
    cursor?: room_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_infos.
     */
    skip?: number
    distinct?: Room_infoScalarFieldEnum | Room_infoScalarFieldEnum[]
  }

  /**
   * room_info create
   */
  export type room_infoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * The data needed to create a room_info.
     */
    data: XOR<room_infoCreateInput, room_infoUncheckedCreateInput>
  }

  /**
   * room_info createMany
   */
  export type room_infoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many room_infos.
     */
    data: room_infoCreateManyInput | room_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * room_info createManyAndReturn
   */
  export type room_infoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * The data used to create many room_infos.
     */
    data: room_infoCreateManyInput | room_infoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_info update
   */
  export type room_infoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * The data needed to update a room_info.
     */
    data: XOR<room_infoUpdateInput, room_infoUncheckedUpdateInput>
    /**
     * Choose, which room_info to update.
     */
    where: room_infoWhereUniqueInput
  }

  /**
   * room_info updateMany
   */
  export type room_infoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update room_infos.
     */
    data: XOR<room_infoUpdateManyMutationInput, room_infoUncheckedUpdateManyInput>
    /**
     * Filter which room_infos to update
     */
    where?: room_infoWhereInput
    /**
     * Limit how many room_infos to update.
     */
    limit?: number
  }

  /**
   * room_info updateManyAndReturn
   */
  export type room_infoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * The data used to update room_infos.
     */
    data: XOR<room_infoUpdateManyMutationInput, room_infoUncheckedUpdateManyInput>
    /**
     * Filter which room_infos to update
     */
    where?: room_infoWhereInput
    /**
     * Limit how many room_infos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_info upsert
   */
  export type room_infoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * The filter to search for the room_info to update in case it exists.
     */
    where: room_infoWhereUniqueInput
    /**
     * In case the room_info found by the `where` argument doesn't exist, create a new room_info with this data.
     */
    create: XOR<room_infoCreateInput, room_infoUncheckedCreateInput>
    /**
     * In case the room_info was found with the provided `where` argument, update it with this data.
     */
    update: XOR<room_infoUpdateInput, room_infoUncheckedUpdateInput>
  }

  /**
   * room_info delete
   */
  export type room_infoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
    /**
     * Filter which room_info to delete.
     */
    where: room_infoWhereUniqueInput
  }

  /**
   * room_info deleteMany
   */
  export type room_infoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_infos to delete
     */
    where?: room_infoWhereInput
    /**
     * Limit how many room_infos to delete.
     */
    limit?: number
  }

  /**
   * room_info.bed_info
   */
  export type room_info$bed_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    where?: bed_infoWhereInput
    orderBy?: bed_infoOrderByWithRelationInput | bed_infoOrderByWithRelationInput[]
    cursor?: bed_infoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Bed_infoScalarFieldEnum | Bed_infoScalarFieldEnum[]
  }

  /**
   * room_info.room_register
   */
  export type room_info$room_registerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    where?: room_registerWhereInput
    orderBy?: room_registerOrderByWithRelationInput | room_registerOrderByWithRelationInput[]
    cursor?: room_registerWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Room_registerScalarFieldEnum | Room_registerScalarFieldEnum[]
  }

  /**
   * room_info without action
   */
  export type room_infoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_info
     */
    select?: room_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_info
     */
    omit?: room_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_infoInclude<ExtArgs> | null
  }


  /**
   * Model bed_info
   */

  export type AggregateBed_info = {
    _count: Bed_infoCountAggregateOutputType | null
    _avg: Bed_infoAvgAggregateOutputType | null
    _sum: Bed_infoSumAggregateOutputType | null
    _min: Bed_infoMinAggregateOutputType | null
    _max: Bed_infoMaxAggregateOutputType | null
  }

  export type Bed_infoAvgAggregateOutputType = {
    bed_id: number | null
    room_id: number | null
    assigned_patient_id: number | null
    assigned_nurse_id: number | null
  }

  export type Bed_infoSumAggregateOutputType = {
    bed_id: number | null
    room_id: number | null
    assigned_patient_id: number | null
    assigned_nurse_id: number | null
  }

  export type Bed_infoMinAggregateOutputType = {
    bed_id: number | null
    room_id: number | null
    bed_letter: string | null
    is_available: boolean | null
    is_assigned: boolean | null
    assigned_patient_id: number | null
    assigned_nurse_id: number | null
  }

  export type Bed_infoMaxAggregateOutputType = {
    bed_id: number | null
    room_id: number | null
    bed_letter: string | null
    is_available: boolean | null
    is_assigned: boolean | null
    assigned_patient_id: number | null
    assigned_nurse_id: number | null
  }

  export type Bed_infoCountAggregateOutputType = {
    bed_id: number
    room_id: number
    bed_letter: number
    is_available: number
    is_assigned: number
    assigned_patient_id: number
    assigned_nurse_id: number
    _all: number
  }


  export type Bed_infoAvgAggregateInputType = {
    bed_id?: true
    room_id?: true
    assigned_patient_id?: true
    assigned_nurse_id?: true
  }

  export type Bed_infoSumAggregateInputType = {
    bed_id?: true
    room_id?: true
    assigned_patient_id?: true
    assigned_nurse_id?: true
  }

  export type Bed_infoMinAggregateInputType = {
    bed_id?: true
    room_id?: true
    bed_letter?: true
    is_available?: true
    is_assigned?: true
    assigned_patient_id?: true
    assigned_nurse_id?: true
  }

  export type Bed_infoMaxAggregateInputType = {
    bed_id?: true
    room_id?: true
    bed_letter?: true
    is_available?: true
    is_assigned?: true
    assigned_patient_id?: true
    assigned_nurse_id?: true
  }

  export type Bed_infoCountAggregateInputType = {
    bed_id?: true
    room_id?: true
    bed_letter?: true
    is_available?: true
    is_assigned?: true
    assigned_patient_id?: true
    assigned_nurse_id?: true
    _all?: true
  }

  export type Bed_infoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bed_info to aggregate.
     */
    where?: bed_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bed_infos to fetch.
     */
    orderBy?: bed_infoOrderByWithRelationInput | bed_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: bed_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bed_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bed_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned bed_infos
    **/
    _count?: true | Bed_infoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Bed_infoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Bed_infoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Bed_infoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Bed_infoMaxAggregateInputType
  }

  export type GetBed_infoAggregateType<T extends Bed_infoAggregateArgs> = {
        [P in keyof T & keyof AggregateBed_info]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBed_info[P]>
      : GetScalarType<T[P], AggregateBed_info[P]>
  }




  export type bed_infoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: bed_infoWhereInput
    orderBy?: bed_infoOrderByWithAggregationInput | bed_infoOrderByWithAggregationInput[]
    by: Bed_infoScalarFieldEnum[] | Bed_infoScalarFieldEnum
    having?: bed_infoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Bed_infoCountAggregateInputType | true
    _avg?: Bed_infoAvgAggregateInputType
    _sum?: Bed_infoSumAggregateInputType
    _min?: Bed_infoMinAggregateInputType
    _max?: Bed_infoMaxAggregateInputType
  }

  export type Bed_infoGroupByOutputType = {
    bed_id: number
    room_id: number
    bed_letter: string
    is_available: boolean
    is_assigned: boolean
    assigned_patient_id: number | null
    assigned_nurse_id: number | null
    _count: Bed_infoCountAggregateOutputType | null
    _avg: Bed_infoAvgAggregateOutputType | null
    _sum: Bed_infoSumAggregateOutputType | null
    _min: Bed_infoMinAggregateOutputType | null
    _max: Bed_infoMaxAggregateOutputType | null
  }

  type GetBed_infoGroupByPayload<T extends bed_infoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Bed_infoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Bed_infoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Bed_infoGroupByOutputType[P]>
            : GetScalarType<T[P], Bed_infoGroupByOutputType[P]>
        }
      >
    >


  export type bed_infoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bed_id?: boolean
    room_id?: boolean
    bed_letter?: boolean
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: boolean
    assigned_nurse_id?: boolean
    room_data?: boolean | bed_info$room_dataArgs<ExtArgs>
    user_info?: boolean | bed_info$user_infoArgs<ExtArgs>
    patient_info?: boolean | bed_info$patient_infoArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
    _count?: boolean | Bed_infoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bed_info"]>

  export type bed_infoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bed_id?: boolean
    room_id?: boolean
    bed_letter?: boolean
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: boolean
    assigned_nurse_id?: boolean
    user_info?: boolean | bed_info$user_infoArgs<ExtArgs>
    patient_info?: boolean | bed_info$patient_infoArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bed_info"]>

  export type bed_infoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    bed_id?: boolean
    room_id?: boolean
    bed_letter?: boolean
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: boolean
    assigned_nurse_id?: boolean
    user_info?: boolean | bed_info$user_infoArgs<ExtArgs>
    patient_info?: boolean | bed_info$patient_infoArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["bed_info"]>

  export type bed_infoSelectScalar = {
    bed_id?: boolean
    room_id?: boolean
    bed_letter?: boolean
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: boolean
    assigned_nurse_id?: boolean
  }

  export type bed_infoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"bed_id" | "room_id" | "bed_letter" | "is_available" | "is_assigned" | "assigned_patient_id" | "assigned_nurse_id", ExtArgs["result"]["bed_info"]>
  export type bed_infoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room_data?: boolean | bed_info$room_dataArgs<ExtArgs>
    user_info?: boolean | bed_info$user_infoArgs<ExtArgs>
    patient_info?: boolean | bed_info$patient_infoArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
    _count?: boolean | Bed_infoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type bed_infoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_info?: boolean | bed_info$user_infoArgs<ExtArgs>
    patient_info?: boolean | bed_info$patient_infoArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }
  export type bed_infoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user_info?: boolean | bed_info$user_infoArgs<ExtArgs>
    patient_info?: boolean | bed_info$patient_infoArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }

  export type $bed_infoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "bed_info"
    objects: {
      room_data: Prisma.$room_dataPayload<ExtArgs>[]
      user_info: Prisma.$user_infoPayload<ExtArgs> | null
      patient_info: Prisma.$patient_infoPayload<ExtArgs> | null
      room_info: Prisma.$room_infoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      bed_id: number
      room_id: number
      bed_letter: string
      is_available: boolean
      is_assigned: boolean
      assigned_patient_id: number | null
      assigned_nurse_id: number | null
    }, ExtArgs["result"]["bed_info"]>
    composites: {}
  }

  type bed_infoGetPayload<S extends boolean | null | undefined | bed_infoDefaultArgs> = $Result.GetResult<Prisma.$bed_infoPayload, S>

  type bed_infoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<bed_infoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Bed_infoCountAggregateInputType | true
    }

  export interface bed_infoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['bed_info'], meta: { name: 'bed_info' } }
    /**
     * Find zero or one Bed_info that matches the filter.
     * @param {bed_infoFindUniqueArgs} args - Arguments to find a Bed_info
     * @example
     * // Get one Bed_info
     * const bed_info = await prisma.bed_info.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends bed_infoFindUniqueArgs>(args: SelectSubset<T, bed_infoFindUniqueArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Bed_info that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {bed_infoFindUniqueOrThrowArgs} args - Arguments to find a Bed_info
     * @example
     * // Get one Bed_info
     * const bed_info = await prisma.bed_info.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends bed_infoFindUniqueOrThrowArgs>(args: SelectSubset<T, bed_infoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bed_info that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bed_infoFindFirstArgs} args - Arguments to find a Bed_info
     * @example
     * // Get one Bed_info
     * const bed_info = await prisma.bed_info.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends bed_infoFindFirstArgs>(args?: SelectSubset<T, bed_infoFindFirstArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Bed_info that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bed_infoFindFirstOrThrowArgs} args - Arguments to find a Bed_info
     * @example
     * // Get one Bed_info
     * const bed_info = await prisma.bed_info.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends bed_infoFindFirstOrThrowArgs>(args?: SelectSubset<T, bed_infoFindFirstOrThrowArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Bed_infos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bed_infoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bed_infos
     * const bed_infos = await prisma.bed_info.findMany()
     * 
     * // Get first 10 Bed_infos
     * const bed_infos = await prisma.bed_info.findMany({ take: 10 })
     * 
     * // Only select the `bed_id`
     * const bed_infoWithBed_idOnly = await prisma.bed_info.findMany({ select: { bed_id: true } })
     * 
     */
    findMany<T extends bed_infoFindManyArgs>(args?: SelectSubset<T, bed_infoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Bed_info.
     * @param {bed_infoCreateArgs} args - Arguments to create a Bed_info.
     * @example
     * // Create one Bed_info
     * const Bed_info = await prisma.bed_info.create({
     *   data: {
     *     // ... data to create a Bed_info
     *   }
     * })
     * 
     */
    create<T extends bed_infoCreateArgs>(args: SelectSubset<T, bed_infoCreateArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Bed_infos.
     * @param {bed_infoCreateManyArgs} args - Arguments to create many Bed_infos.
     * @example
     * // Create many Bed_infos
     * const bed_info = await prisma.bed_info.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends bed_infoCreateManyArgs>(args?: SelectSubset<T, bed_infoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Bed_infos and returns the data saved in the database.
     * @param {bed_infoCreateManyAndReturnArgs} args - Arguments to create many Bed_infos.
     * @example
     * // Create many Bed_infos
     * const bed_info = await prisma.bed_info.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Bed_infos and only return the `bed_id`
     * const bed_infoWithBed_idOnly = await prisma.bed_info.createManyAndReturn({
     *   select: { bed_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends bed_infoCreateManyAndReturnArgs>(args?: SelectSubset<T, bed_infoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Bed_info.
     * @param {bed_infoDeleteArgs} args - Arguments to delete one Bed_info.
     * @example
     * // Delete one Bed_info
     * const Bed_info = await prisma.bed_info.delete({
     *   where: {
     *     // ... filter to delete one Bed_info
     *   }
     * })
     * 
     */
    delete<T extends bed_infoDeleteArgs>(args: SelectSubset<T, bed_infoDeleteArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Bed_info.
     * @param {bed_infoUpdateArgs} args - Arguments to update one Bed_info.
     * @example
     * // Update one Bed_info
     * const bed_info = await prisma.bed_info.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends bed_infoUpdateArgs>(args: SelectSubset<T, bed_infoUpdateArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Bed_infos.
     * @param {bed_infoDeleteManyArgs} args - Arguments to filter Bed_infos to delete.
     * @example
     * // Delete a few Bed_infos
     * const { count } = await prisma.bed_info.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends bed_infoDeleteManyArgs>(args?: SelectSubset<T, bed_infoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bed_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bed_infoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bed_infos
     * const bed_info = await prisma.bed_info.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends bed_infoUpdateManyArgs>(args: SelectSubset<T, bed_infoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Bed_infos and returns the data updated in the database.
     * @param {bed_infoUpdateManyAndReturnArgs} args - Arguments to update many Bed_infos.
     * @example
     * // Update many Bed_infos
     * const bed_info = await prisma.bed_info.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Bed_infos and only return the `bed_id`
     * const bed_infoWithBed_idOnly = await prisma.bed_info.updateManyAndReturn({
     *   select: { bed_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends bed_infoUpdateManyAndReturnArgs>(args: SelectSubset<T, bed_infoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Bed_info.
     * @param {bed_infoUpsertArgs} args - Arguments to update or create a Bed_info.
     * @example
     * // Update or create a Bed_info
     * const bed_info = await prisma.bed_info.upsert({
     *   create: {
     *     // ... data to create a Bed_info
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Bed_info we want to update
     *   }
     * })
     */
    upsert<T extends bed_infoUpsertArgs>(args: SelectSubset<T, bed_infoUpsertArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Bed_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bed_infoCountArgs} args - Arguments to filter Bed_infos to count.
     * @example
     * // Count the number of Bed_infos
     * const count = await prisma.bed_info.count({
     *   where: {
     *     // ... the filter for the Bed_infos we want to count
     *   }
     * })
    **/
    count<T extends bed_infoCountArgs>(
      args?: Subset<T, bed_infoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Bed_infoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Bed_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Bed_infoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Bed_infoAggregateArgs>(args: Subset<T, Bed_infoAggregateArgs>): Prisma.PrismaPromise<GetBed_infoAggregateType<T>>

    /**
     * Group by Bed_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {bed_infoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends bed_infoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: bed_infoGroupByArgs['orderBy'] }
        : { orderBy?: bed_infoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, bed_infoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBed_infoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the bed_info model
   */
  readonly fields: bed_infoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for bed_info.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__bed_infoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room_data<T extends bed_info$room_dataArgs<ExtArgs> = {}>(args?: Subset<T, bed_info$room_dataArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user_info<T extends bed_info$user_infoArgs<ExtArgs> = {}>(args?: Subset<T, bed_info$user_infoArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    patient_info<T extends bed_info$patient_infoArgs<ExtArgs> = {}>(args?: Subset<T, bed_info$patient_infoArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    room_info<T extends room_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, room_infoDefaultArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the bed_info model
   */
  interface bed_infoFieldRefs {
    readonly bed_id: FieldRef<"bed_info", 'Int'>
    readonly room_id: FieldRef<"bed_info", 'Int'>
    readonly bed_letter: FieldRef<"bed_info", 'String'>
    readonly is_available: FieldRef<"bed_info", 'Boolean'>
    readonly is_assigned: FieldRef<"bed_info", 'Boolean'>
    readonly assigned_patient_id: FieldRef<"bed_info", 'Int'>
    readonly assigned_nurse_id: FieldRef<"bed_info", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * bed_info findUnique
   */
  export type bed_infoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * Filter, which bed_info to fetch.
     */
    where: bed_infoWhereUniqueInput
  }

  /**
   * bed_info findUniqueOrThrow
   */
  export type bed_infoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * Filter, which bed_info to fetch.
     */
    where: bed_infoWhereUniqueInput
  }

  /**
   * bed_info findFirst
   */
  export type bed_infoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * Filter, which bed_info to fetch.
     */
    where?: bed_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bed_infos to fetch.
     */
    orderBy?: bed_infoOrderByWithRelationInput | bed_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bed_infos.
     */
    cursor?: bed_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bed_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bed_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bed_infos.
     */
    distinct?: Bed_infoScalarFieldEnum | Bed_infoScalarFieldEnum[]
  }

  /**
   * bed_info findFirstOrThrow
   */
  export type bed_infoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * Filter, which bed_info to fetch.
     */
    where?: bed_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bed_infos to fetch.
     */
    orderBy?: bed_infoOrderByWithRelationInput | bed_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for bed_infos.
     */
    cursor?: bed_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bed_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bed_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of bed_infos.
     */
    distinct?: Bed_infoScalarFieldEnum | Bed_infoScalarFieldEnum[]
  }

  /**
   * bed_info findMany
   */
  export type bed_infoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * Filter, which bed_infos to fetch.
     */
    where?: bed_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of bed_infos to fetch.
     */
    orderBy?: bed_infoOrderByWithRelationInput | bed_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing bed_infos.
     */
    cursor?: bed_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` bed_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` bed_infos.
     */
    skip?: number
    distinct?: Bed_infoScalarFieldEnum | Bed_infoScalarFieldEnum[]
  }

  /**
   * bed_info create
   */
  export type bed_infoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * The data needed to create a bed_info.
     */
    data: XOR<bed_infoCreateInput, bed_infoUncheckedCreateInput>
  }

  /**
   * bed_info createMany
   */
  export type bed_infoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many bed_infos.
     */
    data: bed_infoCreateManyInput | bed_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * bed_info createManyAndReturn
   */
  export type bed_infoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * The data used to create many bed_infos.
     */
    data: bed_infoCreateManyInput | bed_infoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * bed_info update
   */
  export type bed_infoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * The data needed to update a bed_info.
     */
    data: XOR<bed_infoUpdateInput, bed_infoUncheckedUpdateInput>
    /**
     * Choose, which bed_info to update.
     */
    where: bed_infoWhereUniqueInput
  }

  /**
   * bed_info updateMany
   */
  export type bed_infoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update bed_infos.
     */
    data: XOR<bed_infoUpdateManyMutationInput, bed_infoUncheckedUpdateManyInput>
    /**
     * Filter which bed_infos to update
     */
    where?: bed_infoWhereInput
    /**
     * Limit how many bed_infos to update.
     */
    limit?: number
  }

  /**
   * bed_info updateManyAndReturn
   */
  export type bed_infoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * The data used to update bed_infos.
     */
    data: XOR<bed_infoUpdateManyMutationInput, bed_infoUncheckedUpdateManyInput>
    /**
     * Filter which bed_infos to update
     */
    where?: bed_infoWhereInput
    /**
     * Limit how many bed_infos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * bed_info upsert
   */
  export type bed_infoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * The filter to search for the bed_info to update in case it exists.
     */
    where: bed_infoWhereUniqueInput
    /**
     * In case the bed_info found by the `where` argument doesn't exist, create a new bed_info with this data.
     */
    create: XOR<bed_infoCreateInput, bed_infoUncheckedCreateInput>
    /**
     * In case the bed_info was found with the provided `where` argument, update it with this data.
     */
    update: XOR<bed_infoUpdateInput, bed_infoUncheckedUpdateInput>
  }

  /**
   * bed_info delete
   */
  export type bed_infoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    /**
     * Filter which bed_info to delete.
     */
    where: bed_infoWhereUniqueInput
  }

  /**
   * bed_info deleteMany
   */
  export type bed_infoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which bed_infos to delete
     */
    where?: bed_infoWhereInput
    /**
     * Limit how many bed_infos to delete.
     */
    limit?: number
  }

  /**
   * bed_info.room_data
   */
  export type bed_info$room_dataArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    where?: room_dataWhereInput
    orderBy?: room_dataOrderByWithRelationInput | room_dataOrderByWithRelationInput[]
    cursor?: room_dataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Room_dataScalarFieldEnum | Room_dataScalarFieldEnum[]
  }

  /**
   * bed_info.user_info
   */
  export type bed_info$user_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    where?: user_infoWhereInput
  }

  /**
   * bed_info.patient_info
   */
  export type bed_info$patient_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the patient_info
     */
    select?: patient_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the patient_info
     */
    omit?: patient_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: patient_infoInclude<ExtArgs> | null
    where?: patient_infoWhereInput
  }

  /**
   * bed_info without action
   */
  export type bed_infoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
  }


  /**
   * Model room_data
   */

  export type AggregateRoom_data = {
    _count: Room_dataCountAggregateOutputType | null
    _avg: Room_dataAvgAggregateOutputType | null
    _sum: Room_dataSumAggregateOutputType | null
    _min: Room_dataMinAggregateOutputType | null
    _max: Room_dataMaxAggregateOutputType | null
  }

  export type Room_dataAvgAggregateOutputType = {
    id: number | null
    bed_id: number | null
  }

  export type Room_dataSumAggregateOutputType = {
    id: number | null
    bed_id: number | null
  }

  export type Room_dataMinAggregateOutputType = {
    id: number | null
    bed_id: number | null
    audio_path: string | null
    patient_note: string | null
  }

  export type Room_dataMaxAggregateOutputType = {
    id: number | null
    bed_id: number | null
    audio_path: string | null
    patient_note: string | null
  }

  export type Room_dataCountAggregateOutputType = {
    id: number
    bed_id: number
    audio_path: number
    patient_note: number
    _all: number
  }


  export type Room_dataAvgAggregateInputType = {
    id?: true
    bed_id?: true
  }

  export type Room_dataSumAggregateInputType = {
    id?: true
    bed_id?: true
  }

  export type Room_dataMinAggregateInputType = {
    id?: true
    bed_id?: true
    audio_path?: true
    patient_note?: true
  }

  export type Room_dataMaxAggregateInputType = {
    id?: true
    bed_id?: true
    audio_path?: true
    patient_note?: true
  }

  export type Room_dataCountAggregateInputType = {
    id?: true
    bed_id?: true
    audio_path?: true
    patient_note?: true
    _all?: true
  }

  export type Room_dataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_data to aggregate.
     */
    where?: room_dataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_data to fetch.
     */
    orderBy?: room_dataOrderByWithRelationInput | room_dataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: room_dataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned room_data
    **/
    _count?: true | Room_dataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Room_dataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Room_dataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Room_dataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Room_dataMaxAggregateInputType
  }

  export type GetRoom_dataAggregateType<T extends Room_dataAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom_data]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom_data[P]>
      : GetScalarType<T[P], AggregateRoom_data[P]>
  }




  export type room_dataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_dataWhereInput
    orderBy?: room_dataOrderByWithAggregationInput | room_dataOrderByWithAggregationInput[]
    by: Room_dataScalarFieldEnum[] | Room_dataScalarFieldEnum
    having?: room_dataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Room_dataCountAggregateInputType | true
    _avg?: Room_dataAvgAggregateInputType
    _sum?: Room_dataSumAggregateInputType
    _min?: Room_dataMinAggregateInputType
    _max?: Room_dataMaxAggregateInputType
  }

  export type Room_dataGroupByOutputType = {
    id: number
    bed_id: number
    audio_path: string
    patient_note: string
    _count: Room_dataCountAggregateOutputType | null
    _avg: Room_dataAvgAggregateOutputType | null
    _sum: Room_dataSumAggregateOutputType | null
    _min: Room_dataMinAggregateOutputType | null
    _max: Room_dataMaxAggregateOutputType | null
  }

  type GetRoom_dataGroupByPayload<T extends room_dataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Room_dataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Room_dataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Room_dataGroupByOutputType[P]>
            : GetScalarType<T[P], Room_dataGroupByOutputType[P]>
        }
      >
    >


  export type room_dataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bed_id?: boolean
    audio_path?: boolean
    patient_note?: boolean
    bed_info?: boolean | bed_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_data"]>

  export type room_dataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bed_id?: boolean
    audio_path?: boolean
    patient_note?: boolean
    bed_info?: boolean | bed_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_data"]>

  export type room_dataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bed_id?: boolean
    audio_path?: boolean
    patient_note?: boolean
    bed_info?: boolean | bed_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_data"]>

  export type room_dataSelectScalar = {
    id?: boolean
    bed_id?: boolean
    audio_path?: boolean
    patient_note?: boolean
  }

  export type room_dataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bed_id" | "audio_path" | "patient_note", ExtArgs["result"]["room_data"]>
  export type room_dataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | bed_infoDefaultArgs<ExtArgs>
  }
  export type room_dataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | bed_infoDefaultArgs<ExtArgs>
  }
  export type room_dataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | bed_infoDefaultArgs<ExtArgs>
  }

  export type $room_dataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "room_data"
    objects: {
      bed_info: Prisma.$bed_infoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      bed_id: number
      audio_path: string
      patient_note: string
    }, ExtArgs["result"]["room_data"]>
    composites: {}
  }

  type room_dataGetPayload<S extends boolean | null | undefined | room_dataDefaultArgs> = $Result.GetResult<Prisma.$room_dataPayload, S>

  type room_dataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<room_dataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Room_dataCountAggregateInputType | true
    }

  export interface room_dataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['room_data'], meta: { name: 'room_data' } }
    /**
     * Find zero or one Room_data that matches the filter.
     * @param {room_dataFindUniqueArgs} args - Arguments to find a Room_data
     * @example
     * // Get one Room_data
     * const room_data = await prisma.room_data.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends room_dataFindUniqueArgs>(args: SelectSubset<T, room_dataFindUniqueArgs<ExtArgs>>): Prisma__room_dataClient<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room_data that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {room_dataFindUniqueOrThrowArgs} args - Arguments to find a Room_data
     * @example
     * // Get one Room_data
     * const room_data = await prisma.room_data.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends room_dataFindUniqueOrThrowArgs>(args: SelectSubset<T, room_dataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__room_dataClient<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_dataFindFirstArgs} args - Arguments to find a Room_data
     * @example
     * // Get one Room_data
     * const room_data = await prisma.room_data.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends room_dataFindFirstArgs>(args?: SelectSubset<T, room_dataFindFirstArgs<ExtArgs>>): Prisma__room_dataClient<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_data that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_dataFindFirstOrThrowArgs} args - Arguments to find a Room_data
     * @example
     * // Get one Room_data
     * const room_data = await prisma.room_data.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends room_dataFindFirstOrThrowArgs>(args?: SelectSubset<T, room_dataFindFirstOrThrowArgs<ExtArgs>>): Prisma__room_dataClient<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Room_data that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_dataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Room_data
     * const room_data = await prisma.room_data.findMany()
     * 
     * // Get first 10 Room_data
     * const room_data = await prisma.room_data.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const room_dataWithIdOnly = await prisma.room_data.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends room_dataFindManyArgs>(args?: SelectSubset<T, room_dataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room_data.
     * @param {room_dataCreateArgs} args - Arguments to create a Room_data.
     * @example
     * // Create one Room_data
     * const Room_data = await prisma.room_data.create({
     *   data: {
     *     // ... data to create a Room_data
     *   }
     * })
     * 
     */
    create<T extends room_dataCreateArgs>(args: SelectSubset<T, room_dataCreateArgs<ExtArgs>>): Prisma__room_dataClient<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Room_data.
     * @param {room_dataCreateManyArgs} args - Arguments to create many Room_data.
     * @example
     * // Create many Room_data
     * const room_data = await prisma.room_data.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends room_dataCreateManyArgs>(args?: SelectSubset<T, room_dataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Room_data and returns the data saved in the database.
     * @param {room_dataCreateManyAndReturnArgs} args - Arguments to create many Room_data.
     * @example
     * // Create many Room_data
     * const room_data = await prisma.room_data.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Room_data and only return the `id`
     * const room_dataWithIdOnly = await prisma.room_data.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends room_dataCreateManyAndReturnArgs>(args?: SelectSubset<T, room_dataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room_data.
     * @param {room_dataDeleteArgs} args - Arguments to delete one Room_data.
     * @example
     * // Delete one Room_data
     * const Room_data = await prisma.room_data.delete({
     *   where: {
     *     // ... filter to delete one Room_data
     *   }
     * })
     * 
     */
    delete<T extends room_dataDeleteArgs>(args: SelectSubset<T, room_dataDeleteArgs<ExtArgs>>): Prisma__room_dataClient<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room_data.
     * @param {room_dataUpdateArgs} args - Arguments to update one Room_data.
     * @example
     * // Update one Room_data
     * const room_data = await prisma.room_data.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends room_dataUpdateArgs>(args: SelectSubset<T, room_dataUpdateArgs<ExtArgs>>): Prisma__room_dataClient<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Room_data.
     * @param {room_dataDeleteManyArgs} args - Arguments to filter Room_data to delete.
     * @example
     * // Delete a few Room_data
     * const { count } = await prisma.room_data.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends room_dataDeleteManyArgs>(args?: SelectSubset<T, room_dataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_dataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Room_data
     * const room_data = await prisma.room_data.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends room_dataUpdateManyArgs>(args: SelectSubset<T, room_dataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_data and returns the data updated in the database.
     * @param {room_dataUpdateManyAndReturnArgs} args - Arguments to update many Room_data.
     * @example
     * // Update many Room_data
     * const room_data = await prisma.room_data.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Room_data and only return the `id`
     * const room_dataWithIdOnly = await prisma.room_data.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends room_dataUpdateManyAndReturnArgs>(args: SelectSubset<T, room_dataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room_data.
     * @param {room_dataUpsertArgs} args - Arguments to update or create a Room_data.
     * @example
     * // Update or create a Room_data
     * const room_data = await prisma.room_data.upsert({
     *   create: {
     *     // ... data to create a Room_data
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room_data we want to update
     *   }
     * })
     */
    upsert<T extends room_dataUpsertArgs>(args: SelectSubset<T, room_dataUpsertArgs<ExtArgs>>): Prisma__room_dataClient<$Result.GetResult<Prisma.$room_dataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Room_data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_dataCountArgs} args - Arguments to filter Room_data to count.
     * @example
     * // Count the number of Room_data
     * const count = await prisma.room_data.count({
     *   where: {
     *     // ... the filter for the Room_data we want to count
     *   }
     * })
    **/
    count<T extends room_dataCountArgs>(
      args?: Subset<T, room_dataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Room_dataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room_data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Room_dataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Room_dataAggregateArgs>(args: Subset<T, Room_dataAggregateArgs>): Prisma.PrismaPromise<GetRoom_dataAggregateType<T>>

    /**
     * Group by Room_data.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_dataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends room_dataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: room_dataGroupByArgs['orderBy'] }
        : { orderBy?: room_dataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, room_dataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoom_dataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the room_data model
   */
  readonly fields: room_dataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for room_data.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__room_dataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bed_info<T extends bed_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, bed_infoDefaultArgs<ExtArgs>>): Prisma__bed_infoClient<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the room_data model
   */
  interface room_dataFieldRefs {
    readonly id: FieldRef<"room_data", 'Int'>
    readonly bed_id: FieldRef<"room_data", 'Int'>
    readonly audio_path: FieldRef<"room_data", 'String'>
    readonly patient_note: FieldRef<"room_data", 'String'>
  }
    

  // Custom InputTypes
  /**
   * room_data findUnique
   */
  export type room_dataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * Filter, which room_data to fetch.
     */
    where: room_dataWhereUniqueInput
  }

  /**
   * room_data findUniqueOrThrow
   */
  export type room_dataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * Filter, which room_data to fetch.
     */
    where: room_dataWhereUniqueInput
  }

  /**
   * room_data findFirst
   */
  export type room_dataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * Filter, which room_data to fetch.
     */
    where?: room_dataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_data to fetch.
     */
    orderBy?: room_dataOrderByWithRelationInput | room_dataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_data.
     */
    cursor?: room_dataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_data.
     */
    distinct?: Room_dataScalarFieldEnum | Room_dataScalarFieldEnum[]
  }

  /**
   * room_data findFirstOrThrow
   */
  export type room_dataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * Filter, which room_data to fetch.
     */
    where?: room_dataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_data to fetch.
     */
    orderBy?: room_dataOrderByWithRelationInput | room_dataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_data.
     */
    cursor?: room_dataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_data.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_data.
     */
    distinct?: Room_dataScalarFieldEnum | Room_dataScalarFieldEnum[]
  }

  /**
   * room_data findMany
   */
  export type room_dataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * Filter, which room_data to fetch.
     */
    where?: room_dataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_data to fetch.
     */
    orderBy?: room_dataOrderByWithRelationInput | room_dataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing room_data.
     */
    cursor?: room_dataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_data from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_data.
     */
    skip?: number
    distinct?: Room_dataScalarFieldEnum | Room_dataScalarFieldEnum[]
  }

  /**
   * room_data create
   */
  export type room_dataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * The data needed to create a room_data.
     */
    data: XOR<room_dataCreateInput, room_dataUncheckedCreateInput>
  }

  /**
   * room_data createMany
   */
  export type room_dataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many room_data.
     */
    data: room_dataCreateManyInput | room_dataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * room_data createManyAndReturn
   */
  export type room_dataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * The data used to create many room_data.
     */
    data: room_dataCreateManyInput | room_dataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_data update
   */
  export type room_dataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * The data needed to update a room_data.
     */
    data: XOR<room_dataUpdateInput, room_dataUncheckedUpdateInput>
    /**
     * Choose, which room_data to update.
     */
    where: room_dataWhereUniqueInput
  }

  /**
   * room_data updateMany
   */
  export type room_dataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update room_data.
     */
    data: XOR<room_dataUpdateManyMutationInput, room_dataUncheckedUpdateManyInput>
    /**
     * Filter which room_data to update
     */
    where?: room_dataWhereInput
    /**
     * Limit how many room_data to update.
     */
    limit?: number
  }

  /**
   * room_data updateManyAndReturn
   */
  export type room_dataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * The data used to update room_data.
     */
    data: XOR<room_dataUpdateManyMutationInput, room_dataUncheckedUpdateManyInput>
    /**
     * Filter which room_data to update
     */
    where?: room_dataWhereInput
    /**
     * Limit how many room_data to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_data upsert
   */
  export type room_dataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * The filter to search for the room_data to update in case it exists.
     */
    where: room_dataWhereUniqueInput
    /**
     * In case the room_data found by the `where` argument doesn't exist, create a new room_data with this data.
     */
    create: XOR<room_dataCreateInput, room_dataUncheckedCreateInput>
    /**
     * In case the room_data was found with the provided `where` argument, update it with this data.
     */
    update: XOR<room_dataUpdateInput, room_dataUncheckedUpdateInput>
  }

  /**
   * room_data delete
   */
  export type room_dataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
    /**
     * Filter which room_data to delete.
     */
    where: room_dataWhereUniqueInput
  }

  /**
   * room_data deleteMany
   */
  export type room_dataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_data to delete
     */
    where?: room_dataWhereInput
    /**
     * Limit how many room_data to delete.
     */
    limit?: number
  }

  /**
   * room_data without action
   */
  export type room_dataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_data
     */
    select?: room_dataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_data
     */
    omit?: room_dataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_dataInclude<ExtArgs> | null
  }


  /**
   * Model room_register
   */

  export type AggregateRoom_register = {
    _count: Room_registerCountAggregateOutputType | null
    _avg: Room_registerAvgAggregateOutputType | null
    _sum: Room_registerSumAggregateOutputType | null
    _min: Room_registerMinAggregateOutputType | null
    _max: Room_registerMaxAggregateOutputType | null
  }

  export type Room_registerAvgAggregateOutputType = {
    room_id: number | null
    patient_id: number | null
    session_id: number | null
    center_id: number | null
  }

  export type Room_registerSumAggregateOutputType = {
    room_id: number | null
    patient_id: number | null
    session_id: number | null
    center_id: number | null
  }

  export type Room_registerMinAggregateOutputType = {
    room_id: number | null
    patient_id: number | null
    session_id: number | null
    center_id: number | null
    reg_date: Date | null
    reg_time: Date | null
  }

  export type Room_registerMaxAggregateOutputType = {
    room_id: number | null
    patient_id: number | null
    session_id: number | null
    center_id: number | null
    reg_date: Date | null
    reg_time: Date | null
  }

  export type Room_registerCountAggregateOutputType = {
    room_id: number
    patient_id: number
    session_id: number
    center_id: number
    reg_date: number
    reg_time: number
    _all: number
  }


  export type Room_registerAvgAggregateInputType = {
    room_id?: true
    patient_id?: true
    session_id?: true
    center_id?: true
  }

  export type Room_registerSumAggregateInputType = {
    room_id?: true
    patient_id?: true
    session_id?: true
    center_id?: true
  }

  export type Room_registerMinAggregateInputType = {
    room_id?: true
    patient_id?: true
    session_id?: true
    center_id?: true
    reg_date?: true
    reg_time?: true
  }

  export type Room_registerMaxAggregateInputType = {
    room_id?: true
    patient_id?: true
    session_id?: true
    center_id?: true
    reg_date?: true
    reg_time?: true
  }

  export type Room_registerCountAggregateInputType = {
    room_id?: true
    patient_id?: true
    session_id?: true
    center_id?: true
    reg_date?: true
    reg_time?: true
    _all?: true
  }

  export type Room_registerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_register to aggregate.
     */
    where?: room_registerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_registers to fetch.
     */
    orderBy?: room_registerOrderByWithRelationInput | room_registerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: room_registerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_registers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_registers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned room_registers
    **/
    _count?: true | Room_registerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Room_registerAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Room_registerSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Room_registerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Room_registerMaxAggregateInputType
  }

  export type GetRoom_registerAggregateType<T extends Room_registerAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom_register]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom_register[P]>
      : GetScalarType<T[P], AggregateRoom_register[P]>
  }




  export type room_registerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: room_registerWhereInput
    orderBy?: room_registerOrderByWithAggregationInput | room_registerOrderByWithAggregationInput[]
    by: Room_registerScalarFieldEnum[] | Room_registerScalarFieldEnum
    having?: room_registerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Room_registerCountAggregateInputType | true
    _avg?: Room_registerAvgAggregateInputType
    _sum?: Room_registerSumAggregateInputType
    _min?: Room_registerMinAggregateInputType
    _max?: Room_registerMaxAggregateInputType
  }

  export type Room_registerGroupByOutputType = {
    room_id: number
    patient_id: number
    session_id: number
    center_id: number
    reg_date: Date
    reg_time: Date
    _count: Room_registerCountAggregateOutputType | null
    _avg: Room_registerAvgAggregateOutputType | null
    _sum: Room_registerSumAggregateOutputType | null
    _min: Room_registerMinAggregateOutputType | null
    _max: Room_registerMaxAggregateOutputType | null
  }

  type GetRoom_registerGroupByPayload<T extends room_registerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Room_registerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Room_registerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Room_registerGroupByOutputType[P]>
            : GetScalarType<T[P], Room_registerGroupByOutputType[P]>
        }
      >
    >


  export type room_registerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    patient_id?: boolean
    session_id?: boolean
    center_id?: boolean
    reg_date?: boolean
    reg_time?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_register"]>

  export type room_registerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    patient_id?: boolean
    session_id?: boolean
    center_id?: boolean
    reg_date?: boolean
    reg_time?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_register"]>

  export type room_registerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    room_id?: boolean
    patient_id?: boolean
    session_id?: boolean
    center_id?: boolean
    reg_date?: boolean
    reg_time?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room_register"]>

  export type room_registerSelectScalar = {
    room_id?: boolean
    patient_id?: boolean
    session_id?: boolean
    center_id?: boolean
    reg_date?: boolean
    reg_time?: boolean
  }

  export type room_registerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"room_id" | "patient_id" | "session_id" | "center_id" | "reg_date" | "reg_time", ExtArgs["result"]["room_register"]>
  export type room_registerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }
  export type room_registerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }
  export type room_registerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    patient_info?: boolean | patient_infoDefaultArgs<ExtArgs>
    room_info?: boolean | room_infoDefaultArgs<ExtArgs>
  }

  export type $room_registerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "room_register"
    objects: {
      medicalcenter_info: Prisma.$medicalcenter_infoPayload<ExtArgs>
      patient_info: Prisma.$patient_infoPayload<ExtArgs>
      room_info: Prisma.$room_infoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      room_id: number
      patient_id: number
      session_id: number
      center_id: number
      reg_date: Date
      reg_time: Date
    }, ExtArgs["result"]["room_register"]>
    composites: {}
  }

  type room_registerGetPayload<S extends boolean | null | undefined | room_registerDefaultArgs> = $Result.GetResult<Prisma.$room_registerPayload, S>

  type room_registerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<room_registerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Room_registerCountAggregateInputType | true
    }

  export interface room_registerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['room_register'], meta: { name: 'room_register' } }
    /**
     * Find zero or one Room_register that matches the filter.
     * @param {room_registerFindUniqueArgs} args - Arguments to find a Room_register
     * @example
     * // Get one Room_register
     * const room_register = await prisma.room_register.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends room_registerFindUniqueArgs>(args: SelectSubset<T, room_registerFindUniqueArgs<ExtArgs>>): Prisma__room_registerClient<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room_register that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {room_registerFindUniqueOrThrowArgs} args - Arguments to find a Room_register
     * @example
     * // Get one Room_register
     * const room_register = await prisma.room_register.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends room_registerFindUniqueOrThrowArgs>(args: SelectSubset<T, room_registerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__room_registerClient<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_register that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_registerFindFirstArgs} args - Arguments to find a Room_register
     * @example
     * // Get one Room_register
     * const room_register = await prisma.room_register.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends room_registerFindFirstArgs>(args?: SelectSubset<T, room_registerFindFirstArgs<ExtArgs>>): Prisma__room_registerClient<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room_register that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_registerFindFirstOrThrowArgs} args - Arguments to find a Room_register
     * @example
     * // Get one Room_register
     * const room_register = await prisma.room_register.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends room_registerFindFirstOrThrowArgs>(args?: SelectSubset<T, room_registerFindFirstOrThrowArgs<ExtArgs>>): Prisma__room_registerClient<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Room_registers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_registerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Room_registers
     * const room_registers = await prisma.room_register.findMany()
     * 
     * // Get first 10 Room_registers
     * const room_registers = await prisma.room_register.findMany({ take: 10 })
     * 
     * // Only select the `room_id`
     * const room_registerWithRoom_idOnly = await prisma.room_register.findMany({ select: { room_id: true } })
     * 
     */
    findMany<T extends room_registerFindManyArgs>(args?: SelectSubset<T, room_registerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room_register.
     * @param {room_registerCreateArgs} args - Arguments to create a Room_register.
     * @example
     * // Create one Room_register
     * const Room_register = await prisma.room_register.create({
     *   data: {
     *     // ... data to create a Room_register
     *   }
     * })
     * 
     */
    create<T extends room_registerCreateArgs>(args: SelectSubset<T, room_registerCreateArgs<ExtArgs>>): Prisma__room_registerClient<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Room_registers.
     * @param {room_registerCreateManyArgs} args - Arguments to create many Room_registers.
     * @example
     * // Create many Room_registers
     * const room_register = await prisma.room_register.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends room_registerCreateManyArgs>(args?: SelectSubset<T, room_registerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Room_registers and returns the data saved in the database.
     * @param {room_registerCreateManyAndReturnArgs} args - Arguments to create many Room_registers.
     * @example
     * // Create many Room_registers
     * const room_register = await prisma.room_register.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Room_registers and only return the `room_id`
     * const room_registerWithRoom_idOnly = await prisma.room_register.createManyAndReturn({
     *   select: { room_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends room_registerCreateManyAndReturnArgs>(args?: SelectSubset<T, room_registerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room_register.
     * @param {room_registerDeleteArgs} args - Arguments to delete one Room_register.
     * @example
     * // Delete one Room_register
     * const Room_register = await prisma.room_register.delete({
     *   where: {
     *     // ... filter to delete one Room_register
     *   }
     * })
     * 
     */
    delete<T extends room_registerDeleteArgs>(args: SelectSubset<T, room_registerDeleteArgs<ExtArgs>>): Prisma__room_registerClient<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room_register.
     * @param {room_registerUpdateArgs} args - Arguments to update one Room_register.
     * @example
     * // Update one Room_register
     * const room_register = await prisma.room_register.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends room_registerUpdateArgs>(args: SelectSubset<T, room_registerUpdateArgs<ExtArgs>>): Prisma__room_registerClient<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Room_registers.
     * @param {room_registerDeleteManyArgs} args - Arguments to filter Room_registers to delete.
     * @example
     * // Delete a few Room_registers
     * const { count } = await prisma.room_register.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends room_registerDeleteManyArgs>(args?: SelectSubset<T, room_registerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_registers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_registerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Room_registers
     * const room_register = await prisma.room_register.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends room_registerUpdateManyArgs>(args: SelectSubset<T, room_registerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Room_registers and returns the data updated in the database.
     * @param {room_registerUpdateManyAndReturnArgs} args - Arguments to update many Room_registers.
     * @example
     * // Update many Room_registers
     * const room_register = await prisma.room_register.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Room_registers and only return the `room_id`
     * const room_registerWithRoom_idOnly = await prisma.room_register.updateManyAndReturn({
     *   select: { room_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends room_registerUpdateManyAndReturnArgs>(args: SelectSubset<T, room_registerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room_register.
     * @param {room_registerUpsertArgs} args - Arguments to update or create a Room_register.
     * @example
     * // Update or create a Room_register
     * const room_register = await prisma.room_register.upsert({
     *   create: {
     *     // ... data to create a Room_register
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room_register we want to update
     *   }
     * })
     */
    upsert<T extends room_registerUpsertArgs>(args: SelectSubset<T, room_registerUpsertArgs<ExtArgs>>): Prisma__room_registerClient<$Result.GetResult<Prisma.$room_registerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Room_registers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_registerCountArgs} args - Arguments to filter Room_registers to count.
     * @example
     * // Count the number of Room_registers
     * const count = await prisma.room_register.count({
     *   where: {
     *     // ... the filter for the Room_registers we want to count
     *   }
     * })
    **/
    count<T extends room_registerCountArgs>(
      args?: Subset<T, room_registerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Room_registerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room_register.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Room_registerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Room_registerAggregateArgs>(args: Subset<T, Room_registerAggregateArgs>): Prisma.PrismaPromise<GetRoom_registerAggregateType<T>>

    /**
     * Group by Room_register.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {room_registerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends room_registerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: room_registerGroupByArgs['orderBy'] }
        : { orderBy?: room_registerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, room_registerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoom_registerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the room_register model
   */
  readonly fields: room_registerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for room_register.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__room_registerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medicalcenter_info<T extends medicalcenter_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_infoDefaultArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    patient_info<T extends patient_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, patient_infoDefaultArgs<ExtArgs>>): Prisma__patient_infoClient<$Result.GetResult<Prisma.$patient_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    room_info<T extends room_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, room_infoDefaultArgs<ExtArgs>>): Prisma__room_infoClient<$Result.GetResult<Prisma.$room_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the room_register model
   */
  interface room_registerFieldRefs {
    readonly room_id: FieldRef<"room_register", 'Int'>
    readonly patient_id: FieldRef<"room_register", 'Int'>
    readonly session_id: FieldRef<"room_register", 'Int'>
    readonly center_id: FieldRef<"room_register", 'Int'>
    readonly reg_date: FieldRef<"room_register", 'DateTime'>
    readonly reg_time: FieldRef<"room_register", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * room_register findUnique
   */
  export type room_registerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * Filter, which room_register to fetch.
     */
    where: room_registerWhereUniqueInput
  }

  /**
   * room_register findUniqueOrThrow
   */
  export type room_registerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * Filter, which room_register to fetch.
     */
    where: room_registerWhereUniqueInput
  }

  /**
   * room_register findFirst
   */
  export type room_registerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * Filter, which room_register to fetch.
     */
    where?: room_registerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_registers to fetch.
     */
    orderBy?: room_registerOrderByWithRelationInput | room_registerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_registers.
     */
    cursor?: room_registerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_registers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_registers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_registers.
     */
    distinct?: Room_registerScalarFieldEnum | Room_registerScalarFieldEnum[]
  }

  /**
   * room_register findFirstOrThrow
   */
  export type room_registerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * Filter, which room_register to fetch.
     */
    where?: room_registerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_registers to fetch.
     */
    orderBy?: room_registerOrderByWithRelationInput | room_registerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for room_registers.
     */
    cursor?: room_registerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_registers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_registers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of room_registers.
     */
    distinct?: Room_registerScalarFieldEnum | Room_registerScalarFieldEnum[]
  }

  /**
   * room_register findMany
   */
  export type room_registerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * Filter, which room_registers to fetch.
     */
    where?: room_registerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of room_registers to fetch.
     */
    orderBy?: room_registerOrderByWithRelationInput | room_registerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing room_registers.
     */
    cursor?: room_registerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` room_registers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` room_registers.
     */
    skip?: number
    distinct?: Room_registerScalarFieldEnum | Room_registerScalarFieldEnum[]
  }

  /**
   * room_register create
   */
  export type room_registerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * The data needed to create a room_register.
     */
    data: XOR<room_registerCreateInput, room_registerUncheckedCreateInput>
  }

  /**
   * room_register createMany
   */
  export type room_registerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many room_registers.
     */
    data: room_registerCreateManyInput | room_registerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * room_register createManyAndReturn
   */
  export type room_registerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * The data used to create many room_registers.
     */
    data: room_registerCreateManyInput | room_registerCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_register update
   */
  export type room_registerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * The data needed to update a room_register.
     */
    data: XOR<room_registerUpdateInput, room_registerUncheckedUpdateInput>
    /**
     * Choose, which room_register to update.
     */
    where: room_registerWhereUniqueInput
  }

  /**
   * room_register updateMany
   */
  export type room_registerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update room_registers.
     */
    data: XOR<room_registerUpdateManyMutationInput, room_registerUncheckedUpdateManyInput>
    /**
     * Filter which room_registers to update
     */
    where?: room_registerWhereInput
    /**
     * Limit how many room_registers to update.
     */
    limit?: number
  }

  /**
   * room_register updateManyAndReturn
   */
  export type room_registerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * The data used to update room_registers.
     */
    data: XOR<room_registerUpdateManyMutationInput, room_registerUncheckedUpdateManyInput>
    /**
     * Filter which room_registers to update
     */
    where?: room_registerWhereInput
    /**
     * Limit how many room_registers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * room_register upsert
   */
  export type room_registerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * The filter to search for the room_register to update in case it exists.
     */
    where: room_registerWhereUniqueInput
    /**
     * In case the room_register found by the `where` argument doesn't exist, create a new room_register with this data.
     */
    create: XOR<room_registerCreateInput, room_registerUncheckedCreateInput>
    /**
     * In case the room_register was found with the provided `where` argument, update it with this data.
     */
    update: XOR<room_registerUpdateInput, room_registerUncheckedUpdateInput>
  }

  /**
   * room_register delete
   */
  export type room_registerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
    /**
     * Filter which room_register to delete.
     */
    where: room_registerWhereUniqueInput
  }

  /**
   * room_register deleteMany
   */
  export type room_registerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which room_registers to delete
     */
    where?: room_registerWhereInput
    /**
     * Limit how many room_registers to delete.
     */
    limit?: number
  }

  /**
   * room_register without action
   */
  export type room_registerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the room_register
     */
    select?: room_registerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the room_register
     */
    omit?: room_registerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: room_registerInclude<ExtArgs> | null
  }


  /**
   * Model user_info
   */

  export type AggregateUser_info = {
    _count: User_infoCountAggregateOutputType | null
    _avg: User_infoAvgAggregateOutputType | null
    _sum: User_infoSumAggregateOutputType | null
    _min: User_infoMinAggregateOutputType | null
    _max: User_infoMaxAggregateOutputType | null
  }

  export type User_infoAvgAggregateOutputType = {
    user_id: number | null
    center_id: number | null
  }

  export type User_infoSumAggregateOutputType = {
    user_id: number | null
    center_id: number | null
  }

  export type User_infoMinAggregateOutputType = {
    user_id: number | null
    user_name: string | null
    staff_id: string | null
    password: string | null
    user_role: string | null
    center_id: number | null
    charter_id: string | null
  }

  export type User_infoMaxAggregateOutputType = {
    user_id: number | null
    user_name: string | null
    staff_id: string | null
    password: string | null
    user_role: string | null
    center_id: number | null
    charter_id: string | null
  }

  export type User_infoCountAggregateOutputType = {
    user_id: number
    user_name: number
    staff_id: number
    password: number
    user_role: number
    center_id: number
    charter_id: number
    _all: number
  }


  export type User_infoAvgAggregateInputType = {
    user_id?: true
    center_id?: true
  }

  export type User_infoSumAggregateInputType = {
    user_id?: true
    center_id?: true
  }

  export type User_infoMinAggregateInputType = {
    user_id?: true
    user_name?: true
    staff_id?: true
    password?: true
    user_role?: true
    center_id?: true
    charter_id?: true
  }

  export type User_infoMaxAggregateInputType = {
    user_id?: true
    user_name?: true
    staff_id?: true
    password?: true
    user_role?: true
    center_id?: true
    charter_id?: true
  }

  export type User_infoCountAggregateInputType = {
    user_id?: true
    user_name?: true
    staff_id?: true
    password?: true
    user_role?: true
    center_id?: true
    charter_id?: true
    _all?: true
  }

  export type User_infoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_info to aggregate.
     */
    where?: user_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_infos to fetch.
     */
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_infos
    **/
    _count?: true | User_infoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_infoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_infoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_infoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_infoMaxAggregateInputType
  }

  export type GetUser_infoAggregateType<T extends User_infoAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_info]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_info[P]>
      : GetScalarType<T[P], AggregateUser_info[P]>
  }




  export type user_infoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_infoWhereInput
    orderBy?: user_infoOrderByWithAggregationInput | user_infoOrderByWithAggregationInput[]
    by: User_infoScalarFieldEnum[] | User_infoScalarFieldEnum
    having?: user_infoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_infoCountAggregateInputType | true
    _avg?: User_infoAvgAggregateInputType
    _sum?: User_infoSumAggregateInputType
    _min?: User_infoMinAggregateInputType
    _max?: User_infoMaxAggregateInputType
  }

  export type User_infoGroupByOutputType = {
    user_id: number
    user_name: string
    staff_id: string
    password: string
    user_role: string
    center_id: number
    charter_id: string
    _count: User_infoCountAggregateOutputType | null
    _avg: User_infoAvgAggregateOutputType | null
    _sum: User_infoSumAggregateOutputType | null
    _min: User_infoMinAggregateOutputType | null
    _max: User_infoMaxAggregateOutputType | null
  }

  type GetUser_infoGroupByPayload<T extends user_infoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_infoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_infoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_infoGroupByOutputType[P]>
            : GetScalarType<T[P], User_infoGroupByOutputType[P]>
        }
      >
    >


  export type user_infoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    user_name?: boolean
    staff_id?: boolean
    password?: boolean
    user_role?: boolean
    center_id?: boolean
    charter_id?: boolean
    bed_info?: boolean | user_info$bed_infoArgs<ExtArgs>
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    user_uploads?: boolean | user_info$user_uploadsArgs<ExtArgs>
    _count?: boolean | User_infoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_info"]>

  export type user_infoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    user_name?: boolean
    staff_id?: boolean
    password?: boolean
    user_role?: boolean
    center_id?: boolean
    charter_id?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_info"]>

  export type user_infoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    user_name?: boolean
    staff_id?: boolean
    password?: boolean
    user_role?: boolean
    center_id?: boolean
    charter_id?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_info"]>

  export type user_infoSelectScalar = {
    user_id?: boolean
    user_name?: boolean
    staff_id?: boolean
    password?: boolean
    user_role?: boolean
    center_id?: boolean
    charter_id?: boolean
  }

  export type user_infoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "user_name" | "staff_id" | "password" | "user_role" | "center_id" | "charter_id", ExtArgs["result"]["user_info"]>
  export type user_infoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    bed_info?: boolean | user_info$bed_infoArgs<ExtArgs>
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    user_uploads?: boolean | user_info$user_uploadsArgs<ExtArgs>
    _count?: boolean | User_infoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type user_infoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }
  export type user_infoIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
  }

  export type $user_infoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_info"
    objects: {
      bed_info: Prisma.$bed_infoPayload<ExtArgs>[]
      medicalcenter_info: Prisma.$medicalcenter_infoPayload<ExtArgs>
      user_uploads: Prisma.$user_uploadsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      user_name: string
      staff_id: string
      password: string
      user_role: string
      center_id: number
      charter_id: string
    }, ExtArgs["result"]["user_info"]>
    composites: {}
  }

  type user_infoGetPayload<S extends boolean | null | undefined | user_infoDefaultArgs> = $Result.GetResult<Prisma.$user_infoPayload, S>

  type user_infoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_infoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_infoCountAggregateInputType | true
    }

  export interface user_infoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_info'], meta: { name: 'user_info' } }
    /**
     * Find zero or one User_info that matches the filter.
     * @param {user_infoFindUniqueArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_infoFindUniqueArgs>(args: SelectSubset<T, user_infoFindUniqueArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_info that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_infoFindUniqueOrThrowArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_infoFindUniqueOrThrowArgs>(args: SelectSubset<T, user_infoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_info that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoFindFirstArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_infoFindFirstArgs>(args?: SelectSubset<T, user_infoFindFirstArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_info that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoFindFirstOrThrowArgs} args - Arguments to find a User_info
     * @example
     * // Get one User_info
     * const user_info = await prisma.user_info.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_infoFindFirstOrThrowArgs>(args?: SelectSubset<T, user_infoFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_infos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_infos
     * const user_infos = await prisma.user_info.findMany()
     * 
     * // Get first 10 User_infos
     * const user_infos = await prisma.user_info.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const user_infoWithUser_idOnly = await prisma.user_info.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends user_infoFindManyArgs>(args?: SelectSubset<T, user_infoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_info.
     * @param {user_infoCreateArgs} args - Arguments to create a User_info.
     * @example
     * // Create one User_info
     * const User_info = await prisma.user_info.create({
     *   data: {
     *     // ... data to create a User_info
     *   }
     * })
     * 
     */
    create<T extends user_infoCreateArgs>(args: SelectSubset<T, user_infoCreateArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_infos.
     * @param {user_infoCreateManyArgs} args - Arguments to create many User_infos.
     * @example
     * // Create many User_infos
     * const user_info = await prisma.user_info.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_infoCreateManyArgs>(args?: SelectSubset<T, user_infoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_infos and returns the data saved in the database.
     * @param {user_infoCreateManyAndReturnArgs} args - Arguments to create many User_infos.
     * @example
     * // Create many User_infos
     * const user_info = await prisma.user_info.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_infos and only return the `user_id`
     * const user_infoWithUser_idOnly = await prisma.user_info.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_infoCreateManyAndReturnArgs>(args?: SelectSubset<T, user_infoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_info.
     * @param {user_infoDeleteArgs} args - Arguments to delete one User_info.
     * @example
     * // Delete one User_info
     * const User_info = await prisma.user_info.delete({
     *   where: {
     *     // ... filter to delete one User_info
     *   }
     * })
     * 
     */
    delete<T extends user_infoDeleteArgs>(args: SelectSubset<T, user_infoDeleteArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_info.
     * @param {user_infoUpdateArgs} args - Arguments to update one User_info.
     * @example
     * // Update one User_info
     * const user_info = await prisma.user_info.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_infoUpdateArgs>(args: SelectSubset<T, user_infoUpdateArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_infos.
     * @param {user_infoDeleteManyArgs} args - Arguments to filter User_infos to delete.
     * @example
     * // Delete a few User_infos
     * const { count } = await prisma.user_info.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_infoDeleteManyArgs>(args?: SelectSubset<T, user_infoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_infos
     * const user_info = await prisma.user_info.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_infoUpdateManyArgs>(args: SelectSubset<T, user_infoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_infos and returns the data updated in the database.
     * @param {user_infoUpdateManyAndReturnArgs} args - Arguments to update many User_infos.
     * @example
     * // Update many User_infos
     * const user_info = await prisma.user_info.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_infos and only return the `user_id`
     * const user_infoWithUser_idOnly = await prisma.user_info.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_infoUpdateManyAndReturnArgs>(args: SelectSubset<T, user_infoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_info.
     * @param {user_infoUpsertArgs} args - Arguments to update or create a User_info.
     * @example
     * // Update or create a User_info
     * const user_info = await prisma.user_info.upsert({
     *   create: {
     *     // ... data to create a User_info
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_info we want to update
     *   }
     * })
     */
    upsert<T extends user_infoUpsertArgs>(args: SelectSubset<T, user_infoUpsertArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_infos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoCountArgs} args - Arguments to filter User_infos to count.
     * @example
     * // Count the number of User_infos
     * const count = await prisma.user_info.count({
     *   where: {
     *     // ... the filter for the User_infos we want to count
     *   }
     * })
    **/
    count<T extends user_infoCountArgs>(
      args?: Subset<T, user_infoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_infoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_infoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_infoAggregateArgs>(args: Subset<T, User_infoAggregateArgs>): Prisma.PrismaPromise<GetUser_infoAggregateType<T>>

    /**
     * Group by User_info.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_infoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_infoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_infoGroupByArgs['orderBy'] }
        : { orderBy?: user_infoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_infoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_infoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_info model
   */
  readonly fields: user_infoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_info.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_infoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    bed_info<T extends user_info$bed_infoArgs<ExtArgs> = {}>(args?: Subset<T, user_info$bed_infoArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$bed_infoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    medicalcenter_info<T extends medicalcenter_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_infoDefaultArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user_uploads<T extends user_info$user_uploadsArgs<ExtArgs> = {}>(args?: Subset<T, user_info$user_uploadsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_info model
   */
  interface user_infoFieldRefs {
    readonly user_id: FieldRef<"user_info", 'Int'>
    readonly user_name: FieldRef<"user_info", 'String'>
    readonly staff_id: FieldRef<"user_info", 'String'>
    readonly password: FieldRef<"user_info", 'String'>
    readonly user_role: FieldRef<"user_info", 'String'>
    readonly center_id: FieldRef<"user_info", 'Int'>
    readonly charter_id: FieldRef<"user_info", 'String'>
  }
    

  // Custom InputTypes
  /**
   * user_info findUnique
   */
  export type user_infoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * Filter, which user_info to fetch.
     */
    where: user_infoWhereUniqueInput
  }

  /**
   * user_info findUniqueOrThrow
   */
  export type user_infoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * Filter, which user_info to fetch.
     */
    where: user_infoWhereUniqueInput
  }

  /**
   * user_info findFirst
   */
  export type user_infoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * Filter, which user_info to fetch.
     */
    where?: user_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_infos to fetch.
     */
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_infos.
     */
    cursor?: user_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_infos.
     */
    distinct?: User_infoScalarFieldEnum | User_infoScalarFieldEnum[]
  }

  /**
   * user_info findFirstOrThrow
   */
  export type user_infoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * Filter, which user_info to fetch.
     */
    where?: user_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_infos to fetch.
     */
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_infos.
     */
    cursor?: user_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_infos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_infos.
     */
    distinct?: User_infoScalarFieldEnum | User_infoScalarFieldEnum[]
  }

  /**
   * user_info findMany
   */
  export type user_infoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * Filter, which user_infos to fetch.
     */
    where?: user_infoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_infos to fetch.
     */
    orderBy?: user_infoOrderByWithRelationInput | user_infoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_infos.
     */
    cursor?: user_infoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_infos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_infos.
     */
    skip?: number
    distinct?: User_infoScalarFieldEnum | User_infoScalarFieldEnum[]
  }

  /**
   * user_info create
   */
  export type user_infoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * The data needed to create a user_info.
     */
    data: XOR<user_infoCreateInput, user_infoUncheckedCreateInput>
  }

  /**
   * user_info createMany
   */
  export type user_infoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_infos.
     */
    data: user_infoCreateManyInput | user_infoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_info createManyAndReturn
   */
  export type user_infoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * The data used to create many user_infos.
     */
    data: user_infoCreateManyInput | user_infoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_info update
   */
  export type user_infoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * The data needed to update a user_info.
     */
    data: XOR<user_infoUpdateInput, user_infoUncheckedUpdateInput>
    /**
     * Choose, which user_info to update.
     */
    where: user_infoWhereUniqueInput
  }

  /**
   * user_info updateMany
   */
  export type user_infoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_infos.
     */
    data: XOR<user_infoUpdateManyMutationInput, user_infoUncheckedUpdateManyInput>
    /**
     * Filter which user_infos to update
     */
    where?: user_infoWhereInput
    /**
     * Limit how many user_infos to update.
     */
    limit?: number
  }

  /**
   * user_info updateManyAndReturn
   */
  export type user_infoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * The data used to update user_infos.
     */
    data: XOR<user_infoUpdateManyMutationInput, user_infoUncheckedUpdateManyInput>
    /**
     * Filter which user_infos to update
     */
    where?: user_infoWhereInput
    /**
     * Limit how many user_infos to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_info upsert
   */
  export type user_infoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * The filter to search for the user_info to update in case it exists.
     */
    where: user_infoWhereUniqueInput
    /**
     * In case the user_info found by the `where` argument doesn't exist, create a new user_info with this data.
     */
    create: XOR<user_infoCreateInput, user_infoUncheckedCreateInput>
    /**
     * In case the user_info was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_infoUpdateInput, user_infoUncheckedUpdateInput>
  }

  /**
   * user_info delete
   */
  export type user_infoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
    /**
     * Filter which user_info to delete.
     */
    where: user_infoWhereUniqueInput
  }

  /**
   * user_info deleteMany
   */
  export type user_infoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_infos to delete
     */
    where?: user_infoWhereInput
    /**
     * Limit how many user_infos to delete.
     */
    limit?: number
  }

  /**
   * user_info.bed_info
   */
  export type user_info$bed_infoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the bed_info
     */
    select?: bed_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the bed_info
     */
    omit?: bed_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: bed_infoInclude<ExtArgs> | null
    where?: bed_infoWhereInput
    orderBy?: bed_infoOrderByWithRelationInput | bed_infoOrderByWithRelationInput[]
    cursor?: bed_infoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Bed_infoScalarFieldEnum | Bed_infoScalarFieldEnum[]
  }

  /**
   * user_info.user_uploads
   */
  export type user_info$user_uploadsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    where?: user_uploadsWhereInput
    orderBy?: user_uploadsOrderByWithRelationInput | user_uploadsOrderByWithRelationInput[]
    cursor?: user_uploadsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: User_uploadsScalarFieldEnum | User_uploadsScalarFieldEnum[]
  }

  /**
   * user_info without action
   */
  export type user_infoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_info
     */
    select?: user_infoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_info
     */
    omit?: user_infoOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_infoInclude<ExtArgs> | null
  }


  /**
   * Model user_uploads
   */

  export type AggregateUser_uploads = {
    _count: User_uploadsCountAggregateOutputType | null
    _avg: User_uploadsAvgAggregateOutputType | null
    _sum: User_uploadsSumAggregateOutputType | null
    _min: User_uploadsMinAggregateOutputType | null
    _max: User_uploadsMaxAggregateOutputType | null
  }

  export type User_uploadsAvgAggregateOutputType = {
    user_id: number | null
    center_id: number | null
  }

  export type User_uploadsSumAggregateOutputType = {
    user_id: number | null
    center_id: number | null
  }

  export type User_uploadsMinAggregateOutputType = {
    user_id: number | null
    center_id: number | null
    upload_path: string | null
    unassigned_uploads: string | null
    upload_date: Date | null
    upload_time: Date | null
  }

  export type User_uploadsMaxAggregateOutputType = {
    user_id: number | null
    center_id: number | null
    upload_path: string | null
    unassigned_uploads: string | null
    upload_date: Date | null
    upload_time: Date | null
  }

  export type User_uploadsCountAggregateOutputType = {
    user_id: number
    center_id: number
    upload_path: number
    unassigned_uploads: number
    upload_date: number
    upload_time: number
    _all: number
  }


  export type User_uploadsAvgAggregateInputType = {
    user_id?: true
    center_id?: true
  }

  export type User_uploadsSumAggregateInputType = {
    user_id?: true
    center_id?: true
  }

  export type User_uploadsMinAggregateInputType = {
    user_id?: true
    center_id?: true
    upload_path?: true
    unassigned_uploads?: true
    upload_date?: true
    upload_time?: true
  }

  export type User_uploadsMaxAggregateInputType = {
    user_id?: true
    center_id?: true
    upload_path?: true
    unassigned_uploads?: true
    upload_date?: true
    upload_time?: true
  }

  export type User_uploadsCountAggregateInputType = {
    user_id?: true
    center_id?: true
    upload_path?: true
    unassigned_uploads?: true
    upload_date?: true
    upload_time?: true
    _all?: true
  }

  export type User_uploadsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_uploads to aggregate.
     */
    where?: user_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_uploads to fetch.
     */
    orderBy?: user_uploadsOrderByWithRelationInput | user_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: user_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_uploads
    **/
    _count?: true | User_uploadsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_uploadsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_uploadsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_uploadsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_uploadsMaxAggregateInputType
  }

  export type GetUser_uploadsAggregateType<T extends User_uploadsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_uploads]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_uploads[P]>
      : GetScalarType<T[P], AggregateUser_uploads[P]>
  }




  export type user_uploadsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: user_uploadsWhereInput
    orderBy?: user_uploadsOrderByWithAggregationInput | user_uploadsOrderByWithAggregationInput[]
    by: User_uploadsScalarFieldEnum[] | User_uploadsScalarFieldEnum
    having?: user_uploadsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_uploadsCountAggregateInputType | true
    _avg?: User_uploadsAvgAggregateInputType
    _sum?: User_uploadsSumAggregateInputType
    _min?: User_uploadsMinAggregateInputType
    _max?: User_uploadsMaxAggregateInputType
  }

  export type User_uploadsGroupByOutputType = {
    user_id: number
    center_id: number
    upload_path: string
    unassigned_uploads: string
    upload_date: Date
    upload_time: Date
    _count: User_uploadsCountAggregateOutputType | null
    _avg: User_uploadsAvgAggregateOutputType | null
    _sum: User_uploadsSumAggregateOutputType | null
    _min: User_uploadsMinAggregateOutputType | null
    _max: User_uploadsMaxAggregateOutputType | null
  }

  type GetUser_uploadsGroupByPayload<T extends user_uploadsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<User_uploadsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_uploadsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_uploadsGroupByOutputType[P]>
            : GetScalarType<T[P], User_uploadsGroupByOutputType[P]>
        }
      >
    >


  export type user_uploadsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    center_id?: boolean
    upload_path?: boolean
    unassigned_uploads?: boolean
    upload_date?: boolean
    upload_time?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    user_info?: boolean | user_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_uploads"]>

  export type user_uploadsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    center_id?: boolean
    upload_path?: boolean
    unassigned_uploads?: boolean
    upload_date?: boolean
    upload_time?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    user_info?: boolean | user_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_uploads"]>

  export type user_uploadsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    center_id?: boolean
    upload_path?: boolean
    unassigned_uploads?: boolean
    upload_date?: boolean
    upload_time?: boolean
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    user_info?: boolean | user_infoDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user_uploads"]>

  export type user_uploadsSelectScalar = {
    user_id?: boolean
    center_id?: boolean
    upload_path?: boolean
    unassigned_uploads?: boolean
    upload_date?: boolean
    upload_time?: boolean
  }

  export type user_uploadsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "center_id" | "upload_path" | "unassigned_uploads" | "upload_date" | "upload_time", ExtArgs["result"]["user_uploads"]>
  export type user_uploadsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    user_info?: boolean | user_infoDefaultArgs<ExtArgs>
  }
  export type user_uploadsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    user_info?: boolean | user_infoDefaultArgs<ExtArgs>
  }
  export type user_uploadsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    medicalcenter_info?: boolean | medicalcenter_infoDefaultArgs<ExtArgs>
    user_info?: boolean | user_infoDefaultArgs<ExtArgs>
  }

  export type $user_uploadsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user_uploads"
    objects: {
      medicalcenter_info: Prisma.$medicalcenter_infoPayload<ExtArgs>
      user_info: Prisma.$user_infoPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: number
      center_id: number
      upload_path: string
      unassigned_uploads: string
      upload_date: Date
      upload_time: Date
    }, ExtArgs["result"]["user_uploads"]>
    composites: {}
  }

  type user_uploadsGetPayload<S extends boolean | null | undefined | user_uploadsDefaultArgs> = $Result.GetResult<Prisma.$user_uploadsPayload, S>

  type user_uploadsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<user_uploadsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: User_uploadsCountAggregateInputType | true
    }

  export interface user_uploadsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user_uploads'], meta: { name: 'user_uploads' } }
    /**
     * Find zero or one User_uploads that matches the filter.
     * @param {user_uploadsFindUniqueArgs} args - Arguments to find a User_uploads
     * @example
     * // Get one User_uploads
     * const user_uploads = await prisma.user_uploads.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends user_uploadsFindUniqueArgs>(args: SelectSubset<T, user_uploadsFindUniqueArgs<ExtArgs>>): Prisma__user_uploadsClient<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User_uploads that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {user_uploadsFindUniqueOrThrowArgs} args - Arguments to find a User_uploads
     * @example
     * // Get one User_uploads
     * const user_uploads = await prisma.user_uploads.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends user_uploadsFindUniqueOrThrowArgs>(args: SelectSubset<T, user_uploadsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__user_uploadsClient<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_uploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_uploadsFindFirstArgs} args - Arguments to find a User_uploads
     * @example
     * // Get one User_uploads
     * const user_uploads = await prisma.user_uploads.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends user_uploadsFindFirstArgs>(args?: SelectSubset<T, user_uploadsFindFirstArgs<ExtArgs>>): Prisma__user_uploadsClient<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User_uploads that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_uploadsFindFirstOrThrowArgs} args - Arguments to find a User_uploads
     * @example
     * // Get one User_uploads
     * const user_uploads = await prisma.user_uploads.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends user_uploadsFindFirstOrThrowArgs>(args?: SelectSubset<T, user_uploadsFindFirstOrThrowArgs<ExtArgs>>): Prisma__user_uploadsClient<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more User_uploads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_uploadsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_uploads
     * const user_uploads = await prisma.user_uploads.findMany()
     * 
     * // Get first 10 User_uploads
     * const user_uploads = await prisma.user_uploads.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const user_uploadsWithUser_idOnly = await prisma.user_uploads.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends user_uploadsFindManyArgs>(args?: SelectSubset<T, user_uploadsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User_uploads.
     * @param {user_uploadsCreateArgs} args - Arguments to create a User_uploads.
     * @example
     * // Create one User_uploads
     * const User_uploads = await prisma.user_uploads.create({
     *   data: {
     *     // ... data to create a User_uploads
     *   }
     * })
     * 
     */
    create<T extends user_uploadsCreateArgs>(args: SelectSubset<T, user_uploadsCreateArgs<ExtArgs>>): Prisma__user_uploadsClient<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many User_uploads.
     * @param {user_uploadsCreateManyArgs} args - Arguments to create many User_uploads.
     * @example
     * // Create many User_uploads
     * const user_uploads = await prisma.user_uploads.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends user_uploadsCreateManyArgs>(args?: SelectSubset<T, user_uploadsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many User_uploads and returns the data saved in the database.
     * @param {user_uploadsCreateManyAndReturnArgs} args - Arguments to create many User_uploads.
     * @example
     * // Create many User_uploads
     * const user_uploads = await prisma.user_uploads.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many User_uploads and only return the `user_id`
     * const user_uploadsWithUser_idOnly = await prisma.user_uploads.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends user_uploadsCreateManyAndReturnArgs>(args?: SelectSubset<T, user_uploadsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User_uploads.
     * @param {user_uploadsDeleteArgs} args - Arguments to delete one User_uploads.
     * @example
     * // Delete one User_uploads
     * const User_uploads = await prisma.user_uploads.delete({
     *   where: {
     *     // ... filter to delete one User_uploads
     *   }
     * })
     * 
     */
    delete<T extends user_uploadsDeleteArgs>(args: SelectSubset<T, user_uploadsDeleteArgs<ExtArgs>>): Prisma__user_uploadsClient<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User_uploads.
     * @param {user_uploadsUpdateArgs} args - Arguments to update one User_uploads.
     * @example
     * // Update one User_uploads
     * const user_uploads = await prisma.user_uploads.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends user_uploadsUpdateArgs>(args: SelectSubset<T, user_uploadsUpdateArgs<ExtArgs>>): Prisma__user_uploadsClient<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more User_uploads.
     * @param {user_uploadsDeleteManyArgs} args - Arguments to filter User_uploads to delete.
     * @example
     * // Delete a few User_uploads
     * const { count } = await prisma.user_uploads.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends user_uploadsDeleteManyArgs>(args?: SelectSubset<T, user_uploadsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_uploadsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_uploads
     * const user_uploads = await prisma.user_uploads.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends user_uploadsUpdateManyArgs>(args: SelectSubset<T, user_uploadsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_uploads and returns the data updated in the database.
     * @param {user_uploadsUpdateManyAndReturnArgs} args - Arguments to update many User_uploads.
     * @example
     * // Update many User_uploads
     * const user_uploads = await prisma.user_uploads.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more User_uploads and only return the `user_id`
     * const user_uploadsWithUser_idOnly = await prisma.user_uploads.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends user_uploadsUpdateManyAndReturnArgs>(args: SelectSubset<T, user_uploadsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User_uploads.
     * @param {user_uploadsUpsertArgs} args - Arguments to update or create a User_uploads.
     * @example
     * // Update or create a User_uploads
     * const user_uploads = await prisma.user_uploads.upsert({
     *   create: {
     *     // ... data to create a User_uploads
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_uploads we want to update
     *   }
     * })
     */
    upsert<T extends user_uploadsUpsertArgs>(args: SelectSubset<T, user_uploadsUpsertArgs<ExtArgs>>): Prisma__user_uploadsClient<$Result.GetResult<Prisma.$user_uploadsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of User_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_uploadsCountArgs} args - Arguments to filter User_uploads to count.
     * @example
     * // Count the number of User_uploads
     * const count = await prisma.user_uploads.count({
     *   where: {
     *     // ... the filter for the User_uploads we want to count
     *   }
     * })
    **/
    count<T extends user_uploadsCountArgs>(
      args?: Subset<T, user_uploadsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_uploadsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_uploadsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_uploadsAggregateArgs>(args: Subset<T, User_uploadsAggregateArgs>): Prisma.PrismaPromise<GetUser_uploadsAggregateType<T>>

    /**
     * Group by User_uploads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_uploadsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends user_uploadsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: user_uploadsGroupByArgs['orderBy'] }
        : { orderBy?: user_uploadsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, user_uploadsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_uploadsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user_uploads model
   */
  readonly fields: user_uploadsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_uploads.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__user_uploadsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    medicalcenter_info<T extends medicalcenter_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, medicalcenter_infoDefaultArgs<ExtArgs>>): Prisma__medicalcenter_infoClient<$Result.GetResult<Prisma.$medicalcenter_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user_info<T extends user_infoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, user_infoDefaultArgs<ExtArgs>>): Prisma__user_infoClient<$Result.GetResult<Prisma.$user_infoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user_uploads model
   */
  interface user_uploadsFieldRefs {
    readonly user_id: FieldRef<"user_uploads", 'Int'>
    readonly center_id: FieldRef<"user_uploads", 'Int'>
    readonly upload_path: FieldRef<"user_uploads", 'String'>
    readonly unassigned_uploads: FieldRef<"user_uploads", 'String'>
    readonly upload_date: FieldRef<"user_uploads", 'DateTime'>
    readonly upload_time: FieldRef<"user_uploads", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user_uploads findUnique
   */
  export type user_uploadsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which user_uploads to fetch.
     */
    where: user_uploadsWhereUniqueInput
  }

  /**
   * user_uploads findUniqueOrThrow
   */
  export type user_uploadsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which user_uploads to fetch.
     */
    where: user_uploadsWhereUniqueInput
  }

  /**
   * user_uploads findFirst
   */
  export type user_uploadsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which user_uploads to fetch.
     */
    where?: user_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_uploads to fetch.
     */
    orderBy?: user_uploadsOrderByWithRelationInput | user_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_uploads.
     */
    cursor?: user_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_uploads.
     */
    distinct?: User_uploadsScalarFieldEnum | User_uploadsScalarFieldEnum[]
  }

  /**
   * user_uploads findFirstOrThrow
   */
  export type user_uploadsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which user_uploads to fetch.
     */
    where?: user_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_uploads to fetch.
     */
    orderBy?: user_uploadsOrderByWithRelationInput | user_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_uploads.
     */
    cursor?: user_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_uploads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_uploads.
     */
    distinct?: User_uploadsScalarFieldEnum | User_uploadsScalarFieldEnum[]
  }

  /**
   * user_uploads findMany
   */
  export type user_uploadsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * Filter, which user_uploads to fetch.
     */
    where?: user_uploadsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_uploads to fetch.
     */
    orderBy?: user_uploadsOrderByWithRelationInput | user_uploadsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_uploads.
     */
    cursor?: user_uploadsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_uploads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_uploads.
     */
    skip?: number
    distinct?: User_uploadsScalarFieldEnum | User_uploadsScalarFieldEnum[]
  }

  /**
   * user_uploads create
   */
  export type user_uploadsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * The data needed to create a user_uploads.
     */
    data: XOR<user_uploadsCreateInput, user_uploadsUncheckedCreateInput>
  }

  /**
   * user_uploads createMany
   */
  export type user_uploadsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many user_uploads.
     */
    data: user_uploadsCreateManyInput | user_uploadsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user_uploads createManyAndReturn
   */
  export type user_uploadsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * The data used to create many user_uploads.
     */
    data: user_uploadsCreateManyInput | user_uploadsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_uploads update
   */
  export type user_uploadsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * The data needed to update a user_uploads.
     */
    data: XOR<user_uploadsUpdateInput, user_uploadsUncheckedUpdateInput>
    /**
     * Choose, which user_uploads to update.
     */
    where: user_uploadsWhereUniqueInput
  }

  /**
   * user_uploads updateMany
   */
  export type user_uploadsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update user_uploads.
     */
    data: XOR<user_uploadsUpdateManyMutationInput, user_uploadsUncheckedUpdateManyInput>
    /**
     * Filter which user_uploads to update
     */
    where?: user_uploadsWhereInput
    /**
     * Limit how many user_uploads to update.
     */
    limit?: number
  }

  /**
   * user_uploads updateManyAndReturn
   */
  export type user_uploadsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * The data used to update user_uploads.
     */
    data: XOR<user_uploadsUpdateManyMutationInput, user_uploadsUncheckedUpdateManyInput>
    /**
     * Filter which user_uploads to update
     */
    where?: user_uploadsWhereInput
    /**
     * Limit how many user_uploads to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * user_uploads upsert
   */
  export type user_uploadsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * The filter to search for the user_uploads to update in case it exists.
     */
    where: user_uploadsWhereUniqueInput
    /**
     * In case the user_uploads found by the `where` argument doesn't exist, create a new user_uploads with this data.
     */
    create: XOR<user_uploadsCreateInput, user_uploadsUncheckedCreateInput>
    /**
     * In case the user_uploads was found with the provided `where` argument, update it with this data.
     */
    update: XOR<user_uploadsUpdateInput, user_uploadsUncheckedUpdateInput>
  }

  /**
   * user_uploads delete
   */
  export type user_uploadsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
    /**
     * Filter which user_uploads to delete.
     */
    where: user_uploadsWhereUniqueInput
  }

  /**
   * user_uploads deleteMany
   */
  export type user_uploadsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user_uploads to delete
     */
    where?: user_uploadsWhereInput
    /**
     * Limit how many user_uploads to delete.
     */
    limit?: number
  }

  /**
   * user_uploads without action
   */
  export type user_uploadsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user_uploads
     */
    select?: user_uploadsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user_uploads
     */
    omit?: user_uploadsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: user_uploadsInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const Medicalcenter_infoScalarFieldEnum: {
    center_id: 'center_id',
    center_name: 'center_name',
    address: 'address',
    email: 'email'
  };

  export type Medicalcenter_infoScalarFieldEnum = (typeof Medicalcenter_infoScalarFieldEnum)[keyof typeof Medicalcenter_infoScalarFieldEnum]


  export const Patient_infoScalarFieldEnum: {
    patient_id: 'patient_id',
    patient_name: 'patient_name',
    registered_date: 'registered_date',
    center_id: 'center_id',
    dicharged_date: 'dicharged_date',
    is_discharged: 'is_discharged'
  };

  export type Patient_infoScalarFieldEnum = (typeof Patient_infoScalarFieldEnum)[keyof typeof Patient_infoScalarFieldEnum]


  export const Patient_uploadsScalarFieldEnum: {
    patient_id: 'patient_id',
    session_id: 'session_id',
    upload_path: 'upload_path',
    patient_notes: 'patient_notes',
    upload_time: 'upload_time'
  };

  export type Patient_uploadsScalarFieldEnum = (typeof Patient_uploadsScalarFieldEnum)[keyof typeof Patient_uploadsScalarFieldEnum]


  export const Room_infoScalarFieldEnum: {
    room_id: 'room_id',
    room_number: 'room_number',
    center_id: 'center_id',
    number_of_beds: 'number_of_beds',
    is_full: 'is_full'
  };

  export type Room_infoScalarFieldEnum = (typeof Room_infoScalarFieldEnum)[keyof typeof Room_infoScalarFieldEnum]


  export const Bed_infoScalarFieldEnum: {
    bed_id: 'bed_id',
    room_id: 'room_id',
    bed_letter: 'bed_letter',
    is_available: 'is_available',
    is_assigned: 'is_assigned',
    assigned_patient_id: 'assigned_patient_id',
    assigned_nurse_id: 'assigned_nurse_id'
  };

  export type Bed_infoScalarFieldEnum = (typeof Bed_infoScalarFieldEnum)[keyof typeof Bed_infoScalarFieldEnum]


  export const Room_dataScalarFieldEnum: {
    id: 'id',
    bed_id: 'bed_id',
    audio_path: 'audio_path',
    patient_note: 'patient_note'
  };

  export type Room_dataScalarFieldEnum = (typeof Room_dataScalarFieldEnum)[keyof typeof Room_dataScalarFieldEnum]


  export const Room_registerScalarFieldEnum: {
    room_id: 'room_id',
    patient_id: 'patient_id',
    session_id: 'session_id',
    center_id: 'center_id',
    reg_date: 'reg_date',
    reg_time: 'reg_time'
  };

  export type Room_registerScalarFieldEnum = (typeof Room_registerScalarFieldEnum)[keyof typeof Room_registerScalarFieldEnum]


  export const User_infoScalarFieldEnum: {
    user_id: 'user_id',
    user_name: 'user_name',
    staff_id: 'staff_id',
    password: 'password',
    user_role: 'user_role',
    center_id: 'center_id',
    charter_id: 'charter_id'
  };

  export type User_infoScalarFieldEnum = (typeof User_infoScalarFieldEnum)[keyof typeof User_infoScalarFieldEnum]


  export const User_uploadsScalarFieldEnum: {
    user_id: 'user_id',
    center_id: 'center_id',
    upload_path: 'upload_path',
    unassigned_uploads: 'unassigned_uploads',
    upload_date: 'upload_date',
    upload_time: 'upload_time'
  };

  export type User_uploadsScalarFieldEnum = (typeof User_uploadsScalarFieldEnum)[keyof typeof User_uploadsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type medicalcenter_infoWhereInput = {
    AND?: medicalcenter_infoWhereInput | medicalcenter_infoWhereInput[]
    OR?: medicalcenter_infoWhereInput[]
    NOT?: medicalcenter_infoWhereInput | medicalcenter_infoWhereInput[]
    center_id?: IntFilter<"medicalcenter_info"> | number
    center_name?: StringFilter<"medicalcenter_info"> | string
    address?: StringNullableFilter<"medicalcenter_info"> | string | null
    email?: StringNullableFilter<"medicalcenter_info"> | string | null
    patient_info?: Patient_infoListRelationFilter
    room_info?: Room_infoListRelationFilter
    room_register?: Room_registerListRelationFilter
    user_info?: User_infoListRelationFilter
    user_uploads?: User_uploadsListRelationFilter
  }

  export type medicalcenter_infoOrderByWithRelationInput = {
    center_id?: SortOrder
    center_name?: SortOrder
    address?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    patient_info?: patient_infoOrderByRelationAggregateInput
    room_info?: room_infoOrderByRelationAggregateInput
    room_register?: room_registerOrderByRelationAggregateInput
    user_info?: user_infoOrderByRelationAggregateInput
    user_uploads?: user_uploadsOrderByRelationAggregateInput
  }

  export type medicalcenter_infoWhereUniqueInput = Prisma.AtLeast<{
    center_id?: number
    AND?: medicalcenter_infoWhereInput | medicalcenter_infoWhereInput[]
    OR?: medicalcenter_infoWhereInput[]
    NOT?: medicalcenter_infoWhereInput | medicalcenter_infoWhereInput[]
    center_name?: StringFilter<"medicalcenter_info"> | string
    address?: StringNullableFilter<"medicalcenter_info"> | string | null
    email?: StringNullableFilter<"medicalcenter_info"> | string | null
    patient_info?: Patient_infoListRelationFilter
    room_info?: Room_infoListRelationFilter
    room_register?: Room_registerListRelationFilter
    user_info?: User_infoListRelationFilter
    user_uploads?: User_uploadsListRelationFilter
  }, "center_id">

  export type medicalcenter_infoOrderByWithAggregationInput = {
    center_id?: SortOrder
    center_name?: SortOrder
    address?: SortOrderInput | SortOrder
    email?: SortOrderInput | SortOrder
    _count?: medicalcenter_infoCountOrderByAggregateInput
    _avg?: medicalcenter_infoAvgOrderByAggregateInput
    _max?: medicalcenter_infoMaxOrderByAggregateInput
    _min?: medicalcenter_infoMinOrderByAggregateInput
    _sum?: medicalcenter_infoSumOrderByAggregateInput
  }

  export type medicalcenter_infoScalarWhereWithAggregatesInput = {
    AND?: medicalcenter_infoScalarWhereWithAggregatesInput | medicalcenter_infoScalarWhereWithAggregatesInput[]
    OR?: medicalcenter_infoScalarWhereWithAggregatesInput[]
    NOT?: medicalcenter_infoScalarWhereWithAggregatesInput | medicalcenter_infoScalarWhereWithAggregatesInput[]
    center_id?: IntWithAggregatesFilter<"medicalcenter_info"> | number
    center_name?: StringWithAggregatesFilter<"medicalcenter_info"> | string
    address?: StringNullableWithAggregatesFilter<"medicalcenter_info"> | string | null
    email?: StringNullableWithAggregatesFilter<"medicalcenter_info"> | string | null
  }

  export type patient_infoWhereInput = {
    AND?: patient_infoWhereInput | patient_infoWhereInput[]
    OR?: patient_infoWhereInput[]
    NOT?: patient_infoWhereInput | patient_infoWhereInput[]
    patient_id?: IntFilter<"patient_info"> | number
    patient_name?: StringFilter<"patient_info"> | string
    registered_date?: DateTimeFilter<"patient_info"> | Date | string
    center_id?: IntFilter<"patient_info"> | number
    dicharged_date?: DateTimeNullableFilter<"patient_info"> | Date | string | null
    is_discharged?: BoolFilter<"patient_info"> | boolean
    bed_info?: Bed_infoListRelationFilter
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    patient_uploads?: Patient_uploadsListRelationFilter
    room_register?: Room_registerListRelationFilter
  }

  export type patient_infoOrderByWithRelationInput = {
    patient_id?: SortOrder
    patient_name?: SortOrder
    registered_date?: SortOrder
    center_id?: SortOrder
    dicharged_date?: SortOrderInput | SortOrder
    is_discharged?: SortOrder
    bed_info?: bed_infoOrderByRelationAggregateInput
    medicalcenter_info?: medicalcenter_infoOrderByWithRelationInput
    patient_uploads?: patient_uploadsOrderByRelationAggregateInput
    room_register?: room_registerOrderByRelationAggregateInput
  }

  export type patient_infoWhereUniqueInput = Prisma.AtLeast<{
    patient_id?: number
    AND?: patient_infoWhereInput | patient_infoWhereInput[]
    OR?: patient_infoWhereInput[]
    NOT?: patient_infoWhereInput | patient_infoWhereInput[]
    patient_name?: StringFilter<"patient_info"> | string
    registered_date?: DateTimeFilter<"patient_info"> | Date | string
    center_id?: IntFilter<"patient_info"> | number
    dicharged_date?: DateTimeNullableFilter<"patient_info"> | Date | string | null
    is_discharged?: BoolFilter<"patient_info"> | boolean
    bed_info?: Bed_infoListRelationFilter
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    patient_uploads?: Patient_uploadsListRelationFilter
    room_register?: Room_registerListRelationFilter
  }, "patient_id">

  export type patient_infoOrderByWithAggregationInput = {
    patient_id?: SortOrder
    patient_name?: SortOrder
    registered_date?: SortOrder
    center_id?: SortOrder
    dicharged_date?: SortOrderInput | SortOrder
    is_discharged?: SortOrder
    _count?: patient_infoCountOrderByAggregateInput
    _avg?: patient_infoAvgOrderByAggregateInput
    _max?: patient_infoMaxOrderByAggregateInput
    _min?: patient_infoMinOrderByAggregateInput
    _sum?: patient_infoSumOrderByAggregateInput
  }

  export type patient_infoScalarWhereWithAggregatesInput = {
    AND?: patient_infoScalarWhereWithAggregatesInput | patient_infoScalarWhereWithAggregatesInput[]
    OR?: patient_infoScalarWhereWithAggregatesInput[]
    NOT?: patient_infoScalarWhereWithAggregatesInput | patient_infoScalarWhereWithAggregatesInput[]
    patient_id?: IntWithAggregatesFilter<"patient_info"> | number
    patient_name?: StringWithAggregatesFilter<"patient_info"> | string
    registered_date?: DateTimeWithAggregatesFilter<"patient_info"> | Date | string
    center_id?: IntWithAggregatesFilter<"patient_info"> | number
    dicharged_date?: DateTimeNullableWithAggregatesFilter<"patient_info"> | Date | string | null
    is_discharged?: BoolWithAggregatesFilter<"patient_info"> | boolean
  }

  export type patient_uploadsWhereInput = {
    AND?: patient_uploadsWhereInput | patient_uploadsWhereInput[]
    OR?: patient_uploadsWhereInput[]
    NOT?: patient_uploadsWhereInput | patient_uploadsWhereInput[]
    patient_id?: IntFilter<"patient_uploads"> | number
    session_id?: IntFilter<"patient_uploads"> | number
    upload_path?: StringFilter<"patient_uploads"> | string
    patient_notes?: StringFilter<"patient_uploads"> | string
    upload_time?: DateTimeFilter<"patient_uploads"> | Date | string
    patient_info?: XOR<Patient_infoScalarRelationFilter, patient_infoWhereInput>
  }

  export type patient_uploadsOrderByWithRelationInput = {
    patient_id?: SortOrder
    session_id?: SortOrder
    upload_path?: SortOrder
    patient_notes?: SortOrder
    upload_time?: SortOrder
    patient_info?: patient_infoOrderByWithRelationInput
  }

  export type patient_uploadsWhereUniqueInput = Prisma.AtLeast<{
    patient_id_session_id?: patient_uploadsPatient_idSession_idCompoundUniqueInput
    AND?: patient_uploadsWhereInput | patient_uploadsWhereInput[]
    OR?: patient_uploadsWhereInput[]
    NOT?: patient_uploadsWhereInput | patient_uploadsWhereInput[]
    patient_id?: IntFilter<"patient_uploads"> | number
    session_id?: IntFilter<"patient_uploads"> | number
    upload_path?: StringFilter<"patient_uploads"> | string
    patient_notes?: StringFilter<"patient_uploads"> | string
    upload_time?: DateTimeFilter<"patient_uploads"> | Date | string
    patient_info?: XOR<Patient_infoScalarRelationFilter, patient_infoWhereInput>
  }, "patient_id_session_id">

  export type patient_uploadsOrderByWithAggregationInput = {
    patient_id?: SortOrder
    session_id?: SortOrder
    upload_path?: SortOrder
    patient_notes?: SortOrder
    upload_time?: SortOrder
    _count?: patient_uploadsCountOrderByAggregateInput
    _avg?: patient_uploadsAvgOrderByAggregateInput
    _max?: patient_uploadsMaxOrderByAggregateInput
    _min?: patient_uploadsMinOrderByAggregateInput
    _sum?: patient_uploadsSumOrderByAggregateInput
  }

  export type patient_uploadsScalarWhereWithAggregatesInput = {
    AND?: patient_uploadsScalarWhereWithAggregatesInput | patient_uploadsScalarWhereWithAggregatesInput[]
    OR?: patient_uploadsScalarWhereWithAggregatesInput[]
    NOT?: patient_uploadsScalarWhereWithAggregatesInput | patient_uploadsScalarWhereWithAggregatesInput[]
    patient_id?: IntWithAggregatesFilter<"patient_uploads"> | number
    session_id?: IntWithAggregatesFilter<"patient_uploads"> | number
    upload_path?: StringWithAggregatesFilter<"patient_uploads"> | string
    patient_notes?: StringWithAggregatesFilter<"patient_uploads"> | string
    upload_time?: DateTimeWithAggregatesFilter<"patient_uploads"> | Date | string
  }

  export type room_infoWhereInput = {
    AND?: room_infoWhereInput | room_infoWhereInput[]
    OR?: room_infoWhereInput[]
    NOT?: room_infoWhereInput | room_infoWhereInput[]
    room_id?: IntFilter<"room_info"> | number
    room_number?: IntFilter<"room_info"> | number
    center_id?: IntFilter<"room_info"> | number
    number_of_beds?: IntFilter<"room_info"> | number
    is_full?: BoolFilter<"room_info"> | boolean
    bed_info?: Bed_infoListRelationFilter
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    room_register?: Room_registerListRelationFilter
  }

  export type room_infoOrderByWithRelationInput = {
    room_id?: SortOrder
    room_number?: SortOrder
    center_id?: SortOrder
    number_of_beds?: SortOrder
    is_full?: SortOrder
    bed_info?: bed_infoOrderByRelationAggregateInput
    medicalcenter_info?: medicalcenter_infoOrderByWithRelationInput
    room_register?: room_registerOrderByRelationAggregateInput
  }

  export type room_infoWhereUniqueInput = Prisma.AtLeast<{
    room_id?: number
    AND?: room_infoWhereInput | room_infoWhereInput[]
    OR?: room_infoWhereInput[]
    NOT?: room_infoWhereInput | room_infoWhereInput[]
    room_number?: IntFilter<"room_info"> | number
    center_id?: IntFilter<"room_info"> | number
    number_of_beds?: IntFilter<"room_info"> | number
    is_full?: BoolFilter<"room_info"> | boolean
    bed_info?: Bed_infoListRelationFilter
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    room_register?: Room_registerListRelationFilter
  }, "room_id">

  export type room_infoOrderByWithAggregationInput = {
    room_id?: SortOrder
    room_number?: SortOrder
    center_id?: SortOrder
    number_of_beds?: SortOrder
    is_full?: SortOrder
    _count?: room_infoCountOrderByAggregateInput
    _avg?: room_infoAvgOrderByAggregateInput
    _max?: room_infoMaxOrderByAggregateInput
    _min?: room_infoMinOrderByAggregateInput
    _sum?: room_infoSumOrderByAggregateInput
  }

  export type room_infoScalarWhereWithAggregatesInput = {
    AND?: room_infoScalarWhereWithAggregatesInput | room_infoScalarWhereWithAggregatesInput[]
    OR?: room_infoScalarWhereWithAggregatesInput[]
    NOT?: room_infoScalarWhereWithAggregatesInput | room_infoScalarWhereWithAggregatesInput[]
    room_id?: IntWithAggregatesFilter<"room_info"> | number
    room_number?: IntWithAggregatesFilter<"room_info"> | number
    center_id?: IntWithAggregatesFilter<"room_info"> | number
    number_of_beds?: IntWithAggregatesFilter<"room_info"> | number
    is_full?: BoolWithAggregatesFilter<"room_info"> | boolean
  }

  export type bed_infoWhereInput = {
    AND?: bed_infoWhereInput | bed_infoWhereInput[]
    OR?: bed_infoWhereInput[]
    NOT?: bed_infoWhereInput | bed_infoWhereInput[]
    bed_id?: IntFilter<"bed_info"> | number
    room_id?: IntFilter<"bed_info"> | number
    bed_letter?: StringFilter<"bed_info"> | string
    is_available?: BoolFilter<"bed_info"> | boolean
    is_assigned?: BoolFilter<"bed_info"> | boolean
    assigned_patient_id?: IntNullableFilter<"bed_info"> | number | null
    assigned_nurse_id?: IntNullableFilter<"bed_info"> | number | null
    room_data?: Room_dataListRelationFilter
    user_info?: XOR<User_infoNullableScalarRelationFilter, user_infoWhereInput> | null
    patient_info?: XOR<Patient_infoNullableScalarRelationFilter, patient_infoWhereInput> | null
    room_info?: XOR<Room_infoScalarRelationFilter, room_infoWhereInput>
  }

  export type bed_infoOrderByWithRelationInput = {
    bed_id?: SortOrder
    room_id?: SortOrder
    bed_letter?: SortOrder
    is_available?: SortOrder
    is_assigned?: SortOrder
    assigned_patient_id?: SortOrderInput | SortOrder
    assigned_nurse_id?: SortOrderInput | SortOrder
    room_data?: room_dataOrderByRelationAggregateInput
    user_info?: user_infoOrderByWithRelationInput
    patient_info?: patient_infoOrderByWithRelationInput
    room_info?: room_infoOrderByWithRelationInput
  }

  export type bed_infoWhereUniqueInput = Prisma.AtLeast<{
    bed_id?: number
    AND?: bed_infoWhereInput | bed_infoWhereInput[]
    OR?: bed_infoWhereInput[]
    NOT?: bed_infoWhereInput | bed_infoWhereInput[]
    room_id?: IntFilter<"bed_info"> | number
    bed_letter?: StringFilter<"bed_info"> | string
    is_available?: BoolFilter<"bed_info"> | boolean
    is_assigned?: BoolFilter<"bed_info"> | boolean
    assigned_patient_id?: IntNullableFilter<"bed_info"> | number | null
    assigned_nurse_id?: IntNullableFilter<"bed_info"> | number | null
    room_data?: Room_dataListRelationFilter
    user_info?: XOR<User_infoNullableScalarRelationFilter, user_infoWhereInput> | null
    patient_info?: XOR<Patient_infoNullableScalarRelationFilter, patient_infoWhereInput> | null
    room_info?: XOR<Room_infoScalarRelationFilter, room_infoWhereInput>
  }, "bed_id">

  export type bed_infoOrderByWithAggregationInput = {
    bed_id?: SortOrder
    room_id?: SortOrder
    bed_letter?: SortOrder
    is_available?: SortOrder
    is_assigned?: SortOrder
    assigned_patient_id?: SortOrderInput | SortOrder
    assigned_nurse_id?: SortOrderInput | SortOrder
    _count?: bed_infoCountOrderByAggregateInput
    _avg?: bed_infoAvgOrderByAggregateInput
    _max?: bed_infoMaxOrderByAggregateInput
    _min?: bed_infoMinOrderByAggregateInput
    _sum?: bed_infoSumOrderByAggregateInput
  }

  export type bed_infoScalarWhereWithAggregatesInput = {
    AND?: bed_infoScalarWhereWithAggregatesInput | bed_infoScalarWhereWithAggregatesInput[]
    OR?: bed_infoScalarWhereWithAggregatesInput[]
    NOT?: bed_infoScalarWhereWithAggregatesInput | bed_infoScalarWhereWithAggregatesInput[]
    bed_id?: IntWithAggregatesFilter<"bed_info"> | number
    room_id?: IntWithAggregatesFilter<"bed_info"> | number
    bed_letter?: StringWithAggregatesFilter<"bed_info"> | string
    is_available?: BoolWithAggregatesFilter<"bed_info"> | boolean
    is_assigned?: BoolWithAggregatesFilter<"bed_info"> | boolean
    assigned_patient_id?: IntNullableWithAggregatesFilter<"bed_info"> | number | null
    assigned_nurse_id?: IntNullableWithAggregatesFilter<"bed_info"> | number | null
  }

  export type room_dataWhereInput = {
    AND?: room_dataWhereInput | room_dataWhereInput[]
    OR?: room_dataWhereInput[]
    NOT?: room_dataWhereInput | room_dataWhereInput[]
    id?: IntFilter<"room_data"> | number
    bed_id?: IntFilter<"room_data"> | number
    audio_path?: StringFilter<"room_data"> | string
    patient_note?: StringFilter<"room_data"> | string
    bed_info?: XOR<Bed_infoScalarRelationFilter, bed_infoWhereInput>
  }

  export type room_dataOrderByWithRelationInput = {
    id?: SortOrder
    bed_id?: SortOrder
    audio_path?: SortOrder
    patient_note?: SortOrder
    bed_info?: bed_infoOrderByWithRelationInput
  }

  export type room_dataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: room_dataWhereInput | room_dataWhereInput[]
    OR?: room_dataWhereInput[]
    NOT?: room_dataWhereInput | room_dataWhereInput[]
    bed_id?: IntFilter<"room_data"> | number
    audio_path?: StringFilter<"room_data"> | string
    patient_note?: StringFilter<"room_data"> | string
    bed_info?: XOR<Bed_infoScalarRelationFilter, bed_infoWhereInput>
  }, "id">

  export type room_dataOrderByWithAggregationInput = {
    id?: SortOrder
    bed_id?: SortOrder
    audio_path?: SortOrder
    patient_note?: SortOrder
    _count?: room_dataCountOrderByAggregateInput
    _avg?: room_dataAvgOrderByAggregateInput
    _max?: room_dataMaxOrderByAggregateInput
    _min?: room_dataMinOrderByAggregateInput
    _sum?: room_dataSumOrderByAggregateInput
  }

  export type room_dataScalarWhereWithAggregatesInput = {
    AND?: room_dataScalarWhereWithAggregatesInput | room_dataScalarWhereWithAggregatesInput[]
    OR?: room_dataScalarWhereWithAggregatesInput[]
    NOT?: room_dataScalarWhereWithAggregatesInput | room_dataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"room_data"> | number
    bed_id?: IntWithAggregatesFilter<"room_data"> | number
    audio_path?: StringWithAggregatesFilter<"room_data"> | string
    patient_note?: StringWithAggregatesFilter<"room_data"> | string
  }

  export type room_registerWhereInput = {
    AND?: room_registerWhereInput | room_registerWhereInput[]
    OR?: room_registerWhereInput[]
    NOT?: room_registerWhereInput | room_registerWhereInput[]
    room_id?: IntFilter<"room_register"> | number
    patient_id?: IntFilter<"room_register"> | number
    session_id?: IntFilter<"room_register"> | number
    center_id?: IntFilter<"room_register"> | number
    reg_date?: DateTimeFilter<"room_register"> | Date | string
    reg_time?: DateTimeFilter<"room_register"> | Date | string
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    patient_info?: XOR<Patient_infoScalarRelationFilter, patient_infoWhereInput>
    room_info?: XOR<Room_infoScalarRelationFilter, room_infoWhereInput>
  }

  export type room_registerOrderByWithRelationInput = {
    room_id?: SortOrder
    patient_id?: SortOrder
    session_id?: SortOrder
    center_id?: SortOrder
    reg_date?: SortOrder
    reg_time?: SortOrder
    medicalcenter_info?: medicalcenter_infoOrderByWithRelationInput
    patient_info?: patient_infoOrderByWithRelationInput
    room_info?: room_infoOrderByWithRelationInput
  }

  export type room_registerWhereUniqueInput = Prisma.AtLeast<{
    room_id_patient_id_session_id?: room_registerRoom_idPatient_idSession_idCompoundUniqueInput
    AND?: room_registerWhereInput | room_registerWhereInput[]
    OR?: room_registerWhereInput[]
    NOT?: room_registerWhereInput | room_registerWhereInput[]
    room_id?: IntFilter<"room_register"> | number
    patient_id?: IntFilter<"room_register"> | number
    session_id?: IntFilter<"room_register"> | number
    center_id?: IntFilter<"room_register"> | number
    reg_date?: DateTimeFilter<"room_register"> | Date | string
    reg_time?: DateTimeFilter<"room_register"> | Date | string
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    patient_info?: XOR<Patient_infoScalarRelationFilter, patient_infoWhereInput>
    room_info?: XOR<Room_infoScalarRelationFilter, room_infoWhereInput>
  }, "room_id_patient_id_session_id">

  export type room_registerOrderByWithAggregationInput = {
    room_id?: SortOrder
    patient_id?: SortOrder
    session_id?: SortOrder
    center_id?: SortOrder
    reg_date?: SortOrder
    reg_time?: SortOrder
    _count?: room_registerCountOrderByAggregateInput
    _avg?: room_registerAvgOrderByAggregateInput
    _max?: room_registerMaxOrderByAggregateInput
    _min?: room_registerMinOrderByAggregateInput
    _sum?: room_registerSumOrderByAggregateInput
  }

  export type room_registerScalarWhereWithAggregatesInput = {
    AND?: room_registerScalarWhereWithAggregatesInput | room_registerScalarWhereWithAggregatesInput[]
    OR?: room_registerScalarWhereWithAggregatesInput[]
    NOT?: room_registerScalarWhereWithAggregatesInput | room_registerScalarWhereWithAggregatesInput[]
    room_id?: IntWithAggregatesFilter<"room_register"> | number
    patient_id?: IntWithAggregatesFilter<"room_register"> | number
    session_id?: IntWithAggregatesFilter<"room_register"> | number
    center_id?: IntWithAggregatesFilter<"room_register"> | number
    reg_date?: DateTimeWithAggregatesFilter<"room_register"> | Date | string
    reg_time?: DateTimeWithAggregatesFilter<"room_register"> | Date | string
  }

  export type user_infoWhereInput = {
    AND?: user_infoWhereInput | user_infoWhereInput[]
    OR?: user_infoWhereInput[]
    NOT?: user_infoWhereInput | user_infoWhereInput[]
    user_id?: IntFilter<"user_info"> | number
    user_name?: StringFilter<"user_info"> | string
    staff_id?: StringFilter<"user_info"> | string
    password?: StringFilter<"user_info"> | string
    user_role?: StringFilter<"user_info"> | string
    center_id?: IntFilter<"user_info"> | number
    charter_id?: StringFilter<"user_info"> | string
    bed_info?: Bed_infoListRelationFilter
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    user_uploads?: User_uploadsListRelationFilter
  }

  export type user_infoOrderByWithRelationInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    staff_id?: SortOrder
    password?: SortOrder
    user_role?: SortOrder
    center_id?: SortOrder
    charter_id?: SortOrder
    bed_info?: bed_infoOrderByRelationAggregateInput
    medicalcenter_info?: medicalcenter_infoOrderByWithRelationInput
    user_uploads?: user_uploadsOrderByRelationAggregateInput
  }

  export type user_infoWhereUniqueInput = Prisma.AtLeast<{
    user_id?: number
    AND?: user_infoWhereInput | user_infoWhereInput[]
    OR?: user_infoWhereInput[]
    NOT?: user_infoWhereInput | user_infoWhereInput[]
    user_name?: StringFilter<"user_info"> | string
    staff_id?: StringFilter<"user_info"> | string
    password?: StringFilter<"user_info"> | string
    user_role?: StringFilter<"user_info"> | string
    center_id?: IntFilter<"user_info"> | number
    charter_id?: StringFilter<"user_info"> | string
    bed_info?: Bed_infoListRelationFilter
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    user_uploads?: User_uploadsListRelationFilter
  }, "user_id">

  export type user_infoOrderByWithAggregationInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    staff_id?: SortOrder
    password?: SortOrder
    user_role?: SortOrder
    center_id?: SortOrder
    charter_id?: SortOrder
    _count?: user_infoCountOrderByAggregateInput
    _avg?: user_infoAvgOrderByAggregateInput
    _max?: user_infoMaxOrderByAggregateInput
    _min?: user_infoMinOrderByAggregateInput
    _sum?: user_infoSumOrderByAggregateInput
  }

  export type user_infoScalarWhereWithAggregatesInput = {
    AND?: user_infoScalarWhereWithAggregatesInput | user_infoScalarWhereWithAggregatesInput[]
    OR?: user_infoScalarWhereWithAggregatesInput[]
    NOT?: user_infoScalarWhereWithAggregatesInput | user_infoScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"user_info"> | number
    user_name?: StringWithAggregatesFilter<"user_info"> | string
    staff_id?: StringWithAggregatesFilter<"user_info"> | string
    password?: StringWithAggregatesFilter<"user_info"> | string
    user_role?: StringWithAggregatesFilter<"user_info"> | string
    center_id?: IntWithAggregatesFilter<"user_info"> | number
    charter_id?: StringWithAggregatesFilter<"user_info"> | string
  }

  export type user_uploadsWhereInput = {
    AND?: user_uploadsWhereInput | user_uploadsWhereInput[]
    OR?: user_uploadsWhereInput[]
    NOT?: user_uploadsWhereInput | user_uploadsWhereInput[]
    user_id?: IntFilter<"user_uploads"> | number
    center_id?: IntFilter<"user_uploads"> | number
    upload_path?: StringFilter<"user_uploads"> | string
    unassigned_uploads?: StringFilter<"user_uploads"> | string
    upload_date?: DateTimeFilter<"user_uploads"> | Date | string
    upload_time?: DateTimeFilter<"user_uploads"> | Date | string
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    user_info?: XOR<User_infoScalarRelationFilter, user_infoWhereInput>
  }

  export type user_uploadsOrderByWithRelationInput = {
    user_id?: SortOrder
    center_id?: SortOrder
    upload_path?: SortOrder
    unassigned_uploads?: SortOrder
    upload_date?: SortOrder
    upload_time?: SortOrder
    medicalcenter_info?: medicalcenter_infoOrderByWithRelationInput
    user_info?: user_infoOrderByWithRelationInput
  }

  export type user_uploadsWhereUniqueInput = Prisma.AtLeast<{
    user_id_center_id?: user_uploadsUser_idCenter_idCompoundUniqueInput
    AND?: user_uploadsWhereInput | user_uploadsWhereInput[]
    OR?: user_uploadsWhereInput[]
    NOT?: user_uploadsWhereInput | user_uploadsWhereInput[]
    user_id?: IntFilter<"user_uploads"> | number
    center_id?: IntFilter<"user_uploads"> | number
    upload_path?: StringFilter<"user_uploads"> | string
    unassigned_uploads?: StringFilter<"user_uploads"> | string
    upload_date?: DateTimeFilter<"user_uploads"> | Date | string
    upload_time?: DateTimeFilter<"user_uploads"> | Date | string
    medicalcenter_info?: XOR<Medicalcenter_infoScalarRelationFilter, medicalcenter_infoWhereInput>
    user_info?: XOR<User_infoScalarRelationFilter, user_infoWhereInput>
  }, "user_id_center_id">

  export type user_uploadsOrderByWithAggregationInput = {
    user_id?: SortOrder
    center_id?: SortOrder
    upload_path?: SortOrder
    unassigned_uploads?: SortOrder
    upload_date?: SortOrder
    upload_time?: SortOrder
    _count?: user_uploadsCountOrderByAggregateInput
    _avg?: user_uploadsAvgOrderByAggregateInput
    _max?: user_uploadsMaxOrderByAggregateInput
    _min?: user_uploadsMinOrderByAggregateInput
    _sum?: user_uploadsSumOrderByAggregateInput
  }

  export type user_uploadsScalarWhereWithAggregatesInput = {
    AND?: user_uploadsScalarWhereWithAggregatesInput | user_uploadsScalarWhereWithAggregatesInput[]
    OR?: user_uploadsScalarWhereWithAggregatesInput[]
    NOT?: user_uploadsScalarWhereWithAggregatesInput | user_uploadsScalarWhereWithAggregatesInput[]
    user_id?: IntWithAggregatesFilter<"user_uploads"> | number
    center_id?: IntWithAggregatesFilter<"user_uploads"> | number
    upload_path?: StringWithAggregatesFilter<"user_uploads"> | string
    unassigned_uploads?: StringWithAggregatesFilter<"user_uploads"> | string
    upload_date?: DateTimeWithAggregatesFilter<"user_uploads"> | Date | string
    upload_time?: DateTimeWithAggregatesFilter<"user_uploads"> | Date | string
  }

  export type medicalcenter_infoCreateInput = {
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_info?: room_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoUncheckedCreateInput = {
    center_id?: number
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_info?: room_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoUpdateInput = {
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_info?: room_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type medicalcenter_infoUncheckedUpdateInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_info?: room_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type medicalcenter_infoCreateManyInput = {
    center_id?: number
    center_name: string
    address?: string | null
    email?: string | null
  }

  export type medicalcenter_infoUpdateManyMutationInput = {
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type medicalcenter_infoUncheckedUpdateManyInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type patient_infoCreateInput = {
    patient_name: string
    registered_date: Date | string
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    bed_info?: bed_infoCreateNestedManyWithoutPatient_infoInput
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutPatient_infoInput
    patient_uploads?: patient_uploadsCreateNestedManyWithoutPatient_infoInput
    room_register?: room_registerCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoUncheckedCreateInput = {
    patient_id?: number
    patient_name: string
    registered_date: Date | string
    center_id: number
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutPatient_infoInput
    patient_uploads?: patient_uploadsUncheckedCreateNestedManyWithoutPatient_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoUpdateInput = {
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUpdateManyWithoutPatient_infoNestedInput
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutPatient_infoNestedInput
    patient_uploads?: patient_uploadsUpdateManyWithoutPatient_infoNestedInput
    room_register?: room_registerUpdateManyWithoutPatient_infoNestedInput
  }

  export type patient_infoUncheckedUpdateInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    center_id?: IntFieldUpdateOperationsInput | number
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUncheckedUpdateManyWithoutPatient_infoNestedInput
    patient_uploads?: patient_uploadsUncheckedUpdateManyWithoutPatient_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutPatient_infoNestedInput
  }

  export type patient_infoCreateManyInput = {
    patient_id?: number
    patient_name: string
    registered_date: Date | string
    center_id: number
    dicharged_date?: Date | string | null
    is_discharged?: boolean
  }

  export type patient_infoUpdateManyMutationInput = {
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type patient_infoUncheckedUpdateManyInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    center_id?: IntFieldUpdateOperationsInput | number
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type patient_uploadsCreateInput = {
    session_id: number
    upload_path: string
    patient_notes: string
    upload_time: Date | string
    patient_info: patient_infoCreateNestedOneWithoutPatient_uploadsInput
  }

  export type patient_uploadsUncheckedCreateInput = {
    patient_id: number
    session_id: number
    upload_path: string
    patient_notes: string
    upload_time: Date | string
  }

  export type patient_uploadsUpdateInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    patient_notes?: StringFieldUpdateOperationsInput | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
    patient_info?: patient_infoUpdateOneRequiredWithoutPatient_uploadsNestedInput
  }

  export type patient_uploadsUncheckedUpdateInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    patient_notes?: StringFieldUpdateOperationsInput | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type patient_uploadsCreateManyInput = {
    patient_id: number
    session_id: number
    upload_path: string
    patient_notes: string
    upload_time: Date | string
  }

  export type patient_uploadsUpdateManyMutationInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    patient_notes?: StringFieldUpdateOperationsInput | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type patient_uploadsUncheckedUpdateManyInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    patient_notes?: StringFieldUpdateOperationsInput | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_infoCreateInput = {
    room_number: number
    number_of_beds: number
    is_full?: boolean
    bed_info?: bed_infoCreateNestedManyWithoutRoom_infoInput
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutRoom_infoInput
    room_register?: room_registerCreateNestedManyWithoutRoom_infoInput
  }

  export type room_infoUncheckedCreateInput = {
    room_id?: number
    room_number: number
    center_id: number
    number_of_beds: number
    is_full?: boolean
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutRoom_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutRoom_infoInput
  }

  export type room_infoUpdateInput = {
    room_number?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUpdateManyWithoutRoom_infoNestedInput
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutRoom_infoNestedInput
    room_register?: room_registerUpdateManyWithoutRoom_infoNestedInput
  }

  export type room_infoUncheckedUpdateInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_number?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUncheckedUpdateManyWithoutRoom_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutRoom_infoNestedInput
  }

  export type room_infoCreateManyInput = {
    room_id?: number
    room_number: number
    center_id: number
    number_of_beds: number
    is_full?: boolean
  }

  export type room_infoUpdateManyMutationInput = {
    room_number?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
  }

  export type room_infoUncheckedUpdateManyInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_number?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
  }

  export type bed_infoCreateInput = {
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    room_data?: room_dataCreateNestedManyWithoutBed_infoInput
    user_info?: user_infoCreateNestedOneWithoutBed_infoInput
    patient_info?: patient_infoCreateNestedOneWithoutBed_infoInput
    room_info: room_infoCreateNestedOneWithoutBed_infoInput
  }

  export type bed_infoUncheckedCreateInput = {
    bed_id?: number
    room_id: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: number | null
    assigned_nurse_id?: number | null
    room_data?: room_dataUncheckedCreateNestedManyWithoutBed_infoInput
  }

  export type bed_infoUpdateInput = {
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    room_data?: room_dataUpdateManyWithoutBed_infoNestedInput
    user_info?: user_infoUpdateOneWithoutBed_infoNestedInput
    patient_info?: patient_infoUpdateOneWithoutBed_infoNestedInput
    room_info?: room_infoUpdateOneRequiredWithoutBed_infoNestedInput
  }

  export type bed_infoUncheckedUpdateInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_patient_id?: NullableIntFieldUpdateOperationsInput | number | null
    assigned_nurse_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_data?: room_dataUncheckedUpdateManyWithoutBed_infoNestedInput
  }

  export type bed_infoCreateManyInput = {
    bed_id?: number
    room_id: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: number | null
    assigned_nurse_id?: number | null
  }

  export type bed_infoUpdateManyMutationInput = {
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
  }

  export type bed_infoUncheckedUpdateManyInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_patient_id?: NullableIntFieldUpdateOperationsInput | number | null
    assigned_nurse_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type room_dataCreateInput = {
    audio_path: string
    patient_note: string
    bed_info: bed_infoCreateNestedOneWithoutRoom_dataInput
  }

  export type room_dataUncheckedCreateInput = {
    id?: number
    bed_id: number
    audio_path: string
    patient_note: string
  }

  export type room_dataUpdateInput = {
    audio_path?: StringFieldUpdateOperationsInput | string
    patient_note?: StringFieldUpdateOperationsInput | string
    bed_info?: bed_infoUpdateOneRequiredWithoutRoom_dataNestedInput
  }

  export type room_dataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    bed_id?: IntFieldUpdateOperationsInput | number
    audio_path?: StringFieldUpdateOperationsInput | string
    patient_note?: StringFieldUpdateOperationsInput | string
  }

  export type room_dataCreateManyInput = {
    id?: number
    bed_id: number
    audio_path: string
    patient_note: string
  }

  export type room_dataUpdateManyMutationInput = {
    audio_path?: StringFieldUpdateOperationsInput | string
    patient_note?: StringFieldUpdateOperationsInput | string
  }

  export type room_dataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    bed_id?: IntFieldUpdateOperationsInput | number
    audio_path?: StringFieldUpdateOperationsInput | string
    patient_note?: StringFieldUpdateOperationsInput | string
  }

  export type room_registerCreateInput = {
    session_id: number
    reg_date: Date | string
    reg_time: Date | string
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutRoom_registerInput
    patient_info: patient_infoCreateNestedOneWithoutRoom_registerInput
    room_info: room_infoCreateNestedOneWithoutRoom_registerInput
  }

  export type room_registerUncheckedCreateInput = {
    room_id: number
    patient_id: number
    session_id: number
    center_id: number
    reg_date: Date | string
    reg_time: Date | string
  }

  export type room_registerUpdateInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutRoom_registerNestedInput
    patient_info?: patient_infoUpdateOneRequiredWithoutRoom_registerNestedInput
    room_info?: room_infoUpdateOneRequiredWithoutRoom_registerNestedInput
  }

  export type room_registerUncheckedUpdateInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_registerCreateManyInput = {
    room_id: number
    patient_id: number
    session_id: number
    center_id: number
    reg_date: Date | string
    reg_time: Date | string
  }

  export type room_registerUpdateManyMutationInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_registerUncheckedUpdateManyInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_infoCreateInput = {
    user_name: string
    staff_id: string
    password: string
    user_role: string
    charter_id: string
    bed_info?: bed_infoCreateNestedManyWithoutUser_infoInput
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutUser_infoInput
    user_uploads?: user_uploadsCreateNestedManyWithoutUser_infoInput
  }

  export type user_infoUncheckedCreateInput = {
    user_id?: number
    user_name: string
    staff_id: string
    password: string
    user_role: string
    center_id: number
    charter_id: string
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutUser_infoInput
    user_uploads?: user_uploadsUncheckedCreateNestedManyWithoutUser_infoInput
  }

  export type user_infoUpdateInput = {
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    charter_id?: StringFieldUpdateOperationsInput | string
    bed_info?: bed_infoUpdateManyWithoutUser_infoNestedInput
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutUser_infoNestedInput
    user_uploads?: user_uploadsUpdateManyWithoutUser_infoNestedInput
  }

  export type user_infoUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    center_id?: IntFieldUpdateOperationsInput | number
    charter_id?: StringFieldUpdateOperationsInput | string
    bed_info?: bed_infoUncheckedUpdateManyWithoutUser_infoNestedInput
    user_uploads?: user_uploadsUncheckedUpdateManyWithoutUser_infoNestedInput
  }

  export type user_infoCreateManyInput = {
    user_id?: number
    user_name: string
    staff_id: string
    password: string
    user_role: string
    center_id: number
    charter_id: string
  }

  export type user_infoUpdateManyMutationInput = {
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    charter_id?: StringFieldUpdateOperationsInput | string
  }

  export type user_infoUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    center_id?: IntFieldUpdateOperationsInput | number
    charter_id?: StringFieldUpdateOperationsInput | string
  }

  export type user_uploadsCreateInput = {
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutUser_uploadsInput
    user_info: user_infoCreateNestedOneWithoutUser_uploadsInput
  }

  export type user_uploadsUncheckedCreateInput = {
    user_id: number
    center_id: number
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
  }

  export type user_uploadsUpdateInput = {
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutUser_uploadsNestedInput
    user_info?: user_infoUpdateOneRequiredWithoutUser_uploadsNestedInput
  }

  export type user_uploadsUncheckedUpdateInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_uploadsCreateManyInput = {
    user_id: number
    center_id: number
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
  }

  export type user_uploadsUpdateManyMutationInput = {
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_uploadsUncheckedUpdateManyInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type Patient_infoListRelationFilter = {
    every?: patient_infoWhereInput
    some?: patient_infoWhereInput
    none?: patient_infoWhereInput
  }

  export type Room_infoListRelationFilter = {
    every?: room_infoWhereInput
    some?: room_infoWhereInput
    none?: room_infoWhereInput
  }

  export type Room_registerListRelationFilter = {
    every?: room_registerWhereInput
    some?: room_registerWhereInput
    none?: room_registerWhereInput
  }

  export type User_infoListRelationFilter = {
    every?: user_infoWhereInput
    some?: user_infoWhereInput
    none?: user_infoWhereInput
  }

  export type User_uploadsListRelationFilter = {
    every?: user_uploadsWhereInput
    some?: user_uploadsWhereInput
    none?: user_uploadsWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type patient_infoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type room_infoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type room_registerOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_infoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_uploadsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type medicalcenter_infoCountOrderByAggregateInput = {
    center_id?: SortOrder
    center_name?: SortOrder
    address?: SortOrder
    email?: SortOrder
  }

  export type medicalcenter_infoAvgOrderByAggregateInput = {
    center_id?: SortOrder
  }

  export type medicalcenter_infoMaxOrderByAggregateInput = {
    center_id?: SortOrder
    center_name?: SortOrder
    address?: SortOrder
    email?: SortOrder
  }

  export type medicalcenter_infoMinOrderByAggregateInput = {
    center_id?: SortOrder
    center_name?: SortOrder
    address?: SortOrder
    email?: SortOrder
  }

  export type medicalcenter_infoSumOrderByAggregateInput = {
    center_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type Bed_infoListRelationFilter = {
    every?: bed_infoWhereInput
    some?: bed_infoWhereInput
    none?: bed_infoWhereInput
  }

  export type Medicalcenter_infoScalarRelationFilter = {
    is?: medicalcenter_infoWhereInput
    isNot?: medicalcenter_infoWhereInput
  }

  export type Patient_uploadsListRelationFilter = {
    every?: patient_uploadsWhereInput
    some?: patient_uploadsWhereInput
    none?: patient_uploadsWhereInput
  }

  export type bed_infoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type patient_uploadsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type patient_infoCountOrderByAggregateInput = {
    patient_id?: SortOrder
    patient_name?: SortOrder
    registered_date?: SortOrder
    center_id?: SortOrder
    dicharged_date?: SortOrder
    is_discharged?: SortOrder
  }

  export type patient_infoAvgOrderByAggregateInput = {
    patient_id?: SortOrder
    center_id?: SortOrder
  }

  export type patient_infoMaxOrderByAggregateInput = {
    patient_id?: SortOrder
    patient_name?: SortOrder
    registered_date?: SortOrder
    center_id?: SortOrder
    dicharged_date?: SortOrder
    is_discharged?: SortOrder
  }

  export type patient_infoMinOrderByAggregateInput = {
    patient_id?: SortOrder
    patient_name?: SortOrder
    registered_date?: SortOrder
    center_id?: SortOrder
    dicharged_date?: SortOrder
    is_discharged?: SortOrder
  }

  export type patient_infoSumOrderByAggregateInput = {
    patient_id?: SortOrder
    center_id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type Patient_infoScalarRelationFilter = {
    is?: patient_infoWhereInput
    isNot?: patient_infoWhereInput
  }

  export type patient_uploadsPatient_idSession_idCompoundUniqueInput = {
    patient_id: number
    session_id: number
  }

  export type patient_uploadsCountOrderByAggregateInput = {
    patient_id?: SortOrder
    session_id?: SortOrder
    upload_path?: SortOrder
    patient_notes?: SortOrder
    upload_time?: SortOrder
  }

  export type patient_uploadsAvgOrderByAggregateInput = {
    patient_id?: SortOrder
    session_id?: SortOrder
  }

  export type patient_uploadsMaxOrderByAggregateInput = {
    patient_id?: SortOrder
    session_id?: SortOrder
    upload_path?: SortOrder
    patient_notes?: SortOrder
    upload_time?: SortOrder
  }

  export type patient_uploadsMinOrderByAggregateInput = {
    patient_id?: SortOrder
    session_id?: SortOrder
    upload_path?: SortOrder
    patient_notes?: SortOrder
    upload_time?: SortOrder
  }

  export type patient_uploadsSumOrderByAggregateInput = {
    patient_id?: SortOrder
    session_id?: SortOrder
  }

  export type room_infoCountOrderByAggregateInput = {
    room_id?: SortOrder
    room_number?: SortOrder
    center_id?: SortOrder
    number_of_beds?: SortOrder
    is_full?: SortOrder
  }

  export type room_infoAvgOrderByAggregateInput = {
    room_id?: SortOrder
    room_number?: SortOrder
    center_id?: SortOrder
    number_of_beds?: SortOrder
  }

  export type room_infoMaxOrderByAggregateInput = {
    room_id?: SortOrder
    room_number?: SortOrder
    center_id?: SortOrder
    number_of_beds?: SortOrder
    is_full?: SortOrder
  }

  export type room_infoMinOrderByAggregateInput = {
    room_id?: SortOrder
    room_number?: SortOrder
    center_id?: SortOrder
    number_of_beds?: SortOrder
    is_full?: SortOrder
  }

  export type room_infoSumOrderByAggregateInput = {
    room_id?: SortOrder
    room_number?: SortOrder
    center_id?: SortOrder
    number_of_beds?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type Room_dataListRelationFilter = {
    every?: room_dataWhereInput
    some?: room_dataWhereInput
    none?: room_dataWhereInput
  }

  export type User_infoNullableScalarRelationFilter = {
    is?: user_infoWhereInput | null
    isNot?: user_infoWhereInput | null
  }

  export type Patient_infoNullableScalarRelationFilter = {
    is?: patient_infoWhereInput | null
    isNot?: patient_infoWhereInput | null
  }

  export type Room_infoScalarRelationFilter = {
    is?: room_infoWhereInput
    isNot?: room_infoWhereInput
  }

  export type room_dataOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type bed_infoCountOrderByAggregateInput = {
    bed_id?: SortOrder
    room_id?: SortOrder
    bed_letter?: SortOrder
    is_available?: SortOrder
    is_assigned?: SortOrder
    assigned_patient_id?: SortOrder
    assigned_nurse_id?: SortOrder
  }

  export type bed_infoAvgOrderByAggregateInput = {
    bed_id?: SortOrder
    room_id?: SortOrder
    assigned_patient_id?: SortOrder
    assigned_nurse_id?: SortOrder
  }

  export type bed_infoMaxOrderByAggregateInput = {
    bed_id?: SortOrder
    room_id?: SortOrder
    bed_letter?: SortOrder
    is_available?: SortOrder
    is_assigned?: SortOrder
    assigned_patient_id?: SortOrder
    assigned_nurse_id?: SortOrder
  }

  export type bed_infoMinOrderByAggregateInput = {
    bed_id?: SortOrder
    room_id?: SortOrder
    bed_letter?: SortOrder
    is_available?: SortOrder
    is_assigned?: SortOrder
    assigned_patient_id?: SortOrder
    assigned_nurse_id?: SortOrder
  }

  export type bed_infoSumOrderByAggregateInput = {
    bed_id?: SortOrder
    room_id?: SortOrder
    assigned_patient_id?: SortOrder
    assigned_nurse_id?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type Bed_infoScalarRelationFilter = {
    is?: bed_infoWhereInput
    isNot?: bed_infoWhereInput
  }

  export type room_dataCountOrderByAggregateInput = {
    id?: SortOrder
    bed_id?: SortOrder
    audio_path?: SortOrder
    patient_note?: SortOrder
  }

  export type room_dataAvgOrderByAggregateInput = {
    id?: SortOrder
    bed_id?: SortOrder
  }

  export type room_dataMaxOrderByAggregateInput = {
    id?: SortOrder
    bed_id?: SortOrder
    audio_path?: SortOrder
    patient_note?: SortOrder
  }

  export type room_dataMinOrderByAggregateInput = {
    id?: SortOrder
    bed_id?: SortOrder
    audio_path?: SortOrder
    patient_note?: SortOrder
  }

  export type room_dataSumOrderByAggregateInput = {
    id?: SortOrder
    bed_id?: SortOrder
  }

  export type room_registerRoom_idPatient_idSession_idCompoundUniqueInput = {
    room_id: number
    patient_id: number
    session_id: number
  }

  export type room_registerCountOrderByAggregateInput = {
    room_id?: SortOrder
    patient_id?: SortOrder
    session_id?: SortOrder
    center_id?: SortOrder
    reg_date?: SortOrder
    reg_time?: SortOrder
  }

  export type room_registerAvgOrderByAggregateInput = {
    room_id?: SortOrder
    patient_id?: SortOrder
    session_id?: SortOrder
    center_id?: SortOrder
  }

  export type room_registerMaxOrderByAggregateInput = {
    room_id?: SortOrder
    patient_id?: SortOrder
    session_id?: SortOrder
    center_id?: SortOrder
    reg_date?: SortOrder
    reg_time?: SortOrder
  }

  export type room_registerMinOrderByAggregateInput = {
    room_id?: SortOrder
    patient_id?: SortOrder
    session_id?: SortOrder
    center_id?: SortOrder
    reg_date?: SortOrder
    reg_time?: SortOrder
  }

  export type room_registerSumOrderByAggregateInput = {
    room_id?: SortOrder
    patient_id?: SortOrder
    session_id?: SortOrder
    center_id?: SortOrder
  }

  export type user_infoCountOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    staff_id?: SortOrder
    password?: SortOrder
    user_role?: SortOrder
    center_id?: SortOrder
    charter_id?: SortOrder
  }

  export type user_infoAvgOrderByAggregateInput = {
    user_id?: SortOrder
    center_id?: SortOrder
  }

  export type user_infoMaxOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    staff_id?: SortOrder
    password?: SortOrder
    user_role?: SortOrder
    center_id?: SortOrder
    charter_id?: SortOrder
  }

  export type user_infoMinOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    staff_id?: SortOrder
    password?: SortOrder
    user_role?: SortOrder
    center_id?: SortOrder
    charter_id?: SortOrder
  }

  export type user_infoSumOrderByAggregateInput = {
    user_id?: SortOrder
    center_id?: SortOrder
  }

  export type User_infoScalarRelationFilter = {
    is?: user_infoWhereInput
    isNot?: user_infoWhereInput
  }

  export type user_uploadsUser_idCenter_idCompoundUniqueInput = {
    user_id: number
    center_id: number
  }

  export type user_uploadsCountOrderByAggregateInput = {
    user_id?: SortOrder
    center_id?: SortOrder
    upload_path?: SortOrder
    unassigned_uploads?: SortOrder
    upload_date?: SortOrder
    upload_time?: SortOrder
  }

  export type user_uploadsAvgOrderByAggregateInput = {
    user_id?: SortOrder
    center_id?: SortOrder
  }

  export type user_uploadsMaxOrderByAggregateInput = {
    user_id?: SortOrder
    center_id?: SortOrder
    upload_path?: SortOrder
    unassigned_uploads?: SortOrder
    upload_date?: SortOrder
    upload_time?: SortOrder
  }

  export type user_uploadsMinOrderByAggregateInput = {
    user_id?: SortOrder
    center_id?: SortOrder
    upload_path?: SortOrder
    unassigned_uploads?: SortOrder
    upload_date?: SortOrder
    upload_time?: SortOrder
  }

  export type user_uploadsSumOrderByAggregateInput = {
    user_id?: SortOrder
    center_id?: SortOrder
  }

  export type patient_infoCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<patient_infoCreateWithoutMedicalcenter_infoInput, patient_infoUncheckedCreateWithoutMedicalcenter_infoInput> | patient_infoCreateWithoutMedicalcenter_infoInput[] | patient_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: patient_infoCreateOrConnectWithoutMedicalcenter_infoInput | patient_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: patient_infoCreateManyMedicalcenter_infoInputEnvelope
    connect?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
  }

  export type room_infoCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<room_infoCreateWithoutMedicalcenter_infoInput, room_infoUncheckedCreateWithoutMedicalcenter_infoInput> | room_infoCreateWithoutMedicalcenter_infoInput[] | room_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: room_infoCreateOrConnectWithoutMedicalcenter_infoInput | room_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: room_infoCreateManyMedicalcenter_infoInputEnvelope
    connect?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
  }

  export type room_registerCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<room_registerCreateWithoutMedicalcenter_infoInput, room_registerUncheckedCreateWithoutMedicalcenter_infoInput> | room_registerCreateWithoutMedicalcenter_infoInput[] | room_registerUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutMedicalcenter_infoInput | room_registerCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: room_registerCreateManyMedicalcenter_infoInputEnvelope
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
  }

  export type user_infoCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<user_infoCreateWithoutMedicalcenter_infoInput, user_infoUncheckedCreateWithoutMedicalcenter_infoInput> | user_infoCreateWithoutMedicalcenter_infoInput[] | user_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: user_infoCreateOrConnectWithoutMedicalcenter_infoInput | user_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: user_infoCreateManyMedicalcenter_infoInputEnvelope
    connect?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
  }

  export type user_uploadsCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<user_uploadsCreateWithoutMedicalcenter_infoInput, user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput> | user_uploadsCreateWithoutMedicalcenter_infoInput[] | user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput | user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: user_uploadsCreateManyMedicalcenter_infoInputEnvelope
    connect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
  }

  export type patient_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<patient_infoCreateWithoutMedicalcenter_infoInput, patient_infoUncheckedCreateWithoutMedicalcenter_infoInput> | patient_infoCreateWithoutMedicalcenter_infoInput[] | patient_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: patient_infoCreateOrConnectWithoutMedicalcenter_infoInput | patient_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: patient_infoCreateManyMedicalcenter_infoInputEnvelope
    connect?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
  }

  export type room_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<room_infoCreateWithoutMedicalcenter_infoInput, room_infoUncheckedCreateWithoutMedicalcenter_infoInput> | room_infoCreateWithoutMedicalcenter_infoInput[] | room_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: room_infoCreateOrConnectWithoutMedicalcenter_infoInput | room_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: room_infoCreateManyMedicalcenter_infoInputEnvelope
    connect?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
  }

  export type room_registerUncheckedCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<room_registerCreateWithoutMedicalcenter_infoInput, room_registerUncheckedCreateWithoutMedicalcenter_infoInput> | room_registerCreateWithoutMedicalcenter_infoInput[] | room_registerUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutMedicalcenter_infoInput | room_registerCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: room_registerCreateManyMedicalcenter_infoInputEnvelope
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
  }

  export type user_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<user_infoCreateWithoutMedicalcenter_infoInput, user_infoUncheckedCreateWithoutMedicalcenter_infoInput> | user_infoCreateWithoutMedicalcenter_infoInput[] | user_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: user_infoCreateOrConnectWithoutMedicalcenter_infoInput | user_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: user_infoCreateManyMedicalcenter_infoInputEnvelope
    connect?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
  }

  export type user_uploadsUncheckedCreateNestedManyWithoutMedicalcenter_infoInput = {
    create?: XOR<user_uploadsCreateWithoutMedicalcenter_infoInput, user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput> | user_uploadsCreateWithoutMedicalcenter_infoInput[] | user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput | user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput[]
    createMany?: user_uploadsCreateManyMedicalcenter_infoInputEnvelope
    connect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type patient_infoUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<patient_infoCreateWithoutMedicalcenter_infoInput, patient_infoUncheckedCreateWithoutMedicalcenter_infoInput> | patient_infoCreateWithoutMedicalcenter_infoInput[] | patient_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: patient_infoCreateOrConnectWithoutMedicalcenter_infoInput | patient_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: patient_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | patient_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: patient_infoCreateManyMedicalcenter_infoInputEnvelope
    set?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
    disconnect?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
    delete?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
    connect?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
    update?: patient_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | patient_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: patient_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput | patient_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: patient_infoScalarWhereInput | patient_infoScalarWhereInput[]
  }

  export type room_infoUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<room_infoCreateWithoutMedicalcenter_infoInput, room_infoUncheckedCreateWithoutMedicalcenter_infoInput> | room_infoCreateWithoutMedicalcenter_infoInput[] | room_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: room_infoCreateOrConnectWithoutMedicalcenter_infoInput | room_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: room_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | room_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: room_infoCreateManyMedicalcenter_infoInputEnvelope
    set?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
    disconnect?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
    delete?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
    connect?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
    update?: room_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | room_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: room_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput | room_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: room_infoScalarWhereInput | room_infoScalarWhereInput[]
  }

  export type room_registerUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<room_registerCreateWithoutMedicalcenter_infoInput, room_registerUncheckedCreateWithoutMedicalcenter_infoInput> | room_registerCreateWithoutMedicalcenter_infoInput[] | room_registerUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutMedicalcenter_infoInput | room_registerCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: room_registerUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | room_registerUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: room_registerCreateManyMedicalcenter_infoInputEnvelope
    set?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    disconnect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    delete?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    update?: room_registerUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | room_registerUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: room_registerUpdateManyWithWhereWithoutMedicalcenter_infoInput | room_registerUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: room_registerScalarWhereInput | room_registerScalarWhereInput[]
  }

  export type user_infoUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<user_infoCreateWithoutMedicalcenter_infoInput, user_infoUncheckedCreateWithoutMedicalcenter_infoInput> | user_infoCreateWithoutMedicalcenter_infoInput[] | user_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: user_infoCreateOrConnectWithoutMedicalcenter_infoInput | user_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: user_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | user_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: user_infoCreateManyMedicalcenter_infoInputEnvelope
    set?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
    disconnect?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
    delete?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
    connect?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
    update?: user_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | user_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: user_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput | user_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: user_infoScalarWhereInput | user_infoScalarWhereInput[]
  }

  export type user_uploadsUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<user_uploadsCreateWithoutMedicalcenter_infoInput, user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput> | user_uploadsCreateWithoutMedicalcenter_infoInput[] | user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput | user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: user_uploadsUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | user_uploadsUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: user_uploadsCreateManyMedicalcenter_infoInputEnvelope
    set?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    disconnect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    delete?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    connect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    update?: user_uploadsUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | user_uploadsUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: user_uploadsUpdateManyWithWhereWithoutMedicalcenter_infoInput | user_uploadsUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: user_uploadsScalarWhereInput | user_uploadsScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type patient_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<patient_infoCreateWithoutMedicalcenter_infoInput, patient_infoUncheckedCreateWithoutMedicalcenter_infoInput> | patient_infoCreateWithoutMedicalcenter_infoInput[] | patient_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: patient_infoCreateOrConnectWithoutMedicalcenter_infoInput | patient_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: patient_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | patient_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: patient_infoCreateManyMedicalcenter_infoInputEnvelope
    set?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
    disconnect?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
    delete?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
    connect?: patient_infoWhereUniqueInput | patient_infoWhereUniqueInput[]
    update?: patient_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | patient_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: patient_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput | patient_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: patient_infoScalarWhereInput | patient_infoScalarWhereInput[]
  }

  export type room_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<room_infoCreateWithoutMedicalcenter_infoInput, room_infoUncheckedCreateWithoutMedicalcenter_infoInput> | room_infoCreateWithoutMedicalcenter_infoInput[] | room_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: room_infoCreateOrConnectWithoutMedicalcenter_infoInput | room_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: room_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | room_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: room_infoCreateManyMedicalcenter_infoInputEnvelope
    set?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
    disconnect?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
    delete?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
    connect?: room_infoWhereUniqueInput | room_infoWhereUniqueInput[]
    update?: room_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | room_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: room_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput | room_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: room_infoScalarWhereInput | room_infoScalarWhereInput[]
  }

  export type room_registerUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<room_registerCreateWithoutMedicalcenter_infoInput, room_registerUncheckedCreateWithoutMedicalcenter_infoInput> | room_registerCreateWithoutMedicalcenter_infoInput[] | room_registerUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutMedicalcenter_infoInput | room_registerCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: room_registerUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | room_registerUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: room_registerCreateManyMedicalcenter_infoInputEnvelope
    set?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    disconnect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    delete?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    update?: room_registerUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | room_registerUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: room_registerUpdateManyWithWhereWithoutMedicalcenter_infoInput | room_registerUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: room_registerScalarWhereInput | room_registerScalarWhereInput[]
  }

  export type user_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<user_infoCreateWithoutMedicalcenter_infoInput, user_infoUncheckedCreateWithoutMedicalcenter_infoInput> | user_infoCreateWithoutMedicalcenter_infoInput[] | user_infoUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: user_infoCreateOrConnectWithoutMedicalcenter_infoInput | user_infoCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: user_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | user_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: user_infoCreateManyMedicalcenter_infoInputEnvelope
    set?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
    disconnect?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
    delete?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
    connect?: user_infoWhereUniqueInput | user_infoWhereUniqueInput[]
    update?: user_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | user_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: user_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput | user_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: user_infoScalarWhereInput | user_infoScalarWhereInput[]
  }

  export type user_uploadsUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput = {
    create?: XOR<user_uploadsCreateWithoutMedicalcenter_infoInput, user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput> | user_uploadsCreateWithoutMedicalcenter_infoInput[] | user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput[]
    connectOrCreate?: user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput | user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput[]
    upsert?: user_uploadsUpsertWithWhereUniqueWithoutMedicalcenter_infoInput | user_uploadsUpsertWithWhereUniqueWithoutMedicalcenter_infoInput[]
    createMany?: user_uploadsCreateManyMedicalcenter_infoInputEnvelope
    set?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    disconnect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    delete?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    connect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    update?: user_uploadsUpdateWithWhereUniqueWithoutMedicalcenter_infoInput | user_uploadsUpdateWithWhereUniqueWithoutMedicalcenter_infoInput[]
    updateMany?: user_uploadsUpdateManyWithWhereWithoutMedicalcenter_infoInput | user_uploadsUpdateManyWithWhereWithoutMedicalcenter_infoInput[]
    deleteMany?: user_uploadsScalarWhereInput | user_uploadsScalarWhereInput[]
  }

  export type bed_infoCreateNestedManyWithoutPatient_infoInput = {
    create?: XOR<bed_infoCreateWithoutPatient_infoInput, bed_infoUncheckedCreateWithoutPatient_infoInput> | bed_infoCreateWithoutPatient_infoInput[] | bed_infoUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutPatient_infoInput | bed_infoCreateOrConnectWithoutPatient_infoInput[]
    createMany?: bed_infoCreateManyPatient_infoInputEnvelope
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
  }

  export type medicalcenter_infoCreateNestedOneWithoutPatient_infoInput = {
    create?: XOR<medicalcenter_infoCreateWithoutPatient_infoInput, medicalcenter_infoUncheckedCreateWithoutPatient_infoInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutPatient_infoInput
    connect?: medicalcenter_infoWhereUniqueInput
  }

  export type patient_uploadsCreateNestedManyWithoutPatient_infoInput = {
    create?: XOR<patient_uploadsCreateWithoutPatient_infoInput, patient_uploadsUncheckedCreateWithoutPatient_infoInput> | patient_uploadsCreateWithoutPatient_infoInput[] | patient_uploadsUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: patient_uploadsCreateOrConnectWithoutPatient_infoInput | patient_uploadsCreateOrConnectWithoutPatient_infoInput[]
    createMany?: patient_uploadsCreateManyPatient_infoInputEnvelope
    connect?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
  }

  export type room_registerCreateNestedManyWithoutPatient_infoInput = {
    create?: XOR<room_registerCreateWithoutPatient_infoInput, room_registerUncheckedCreateWithoutPatient_infoInput> | room_registerCreateWithoutPatient_infoInput[] | room_registerUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutPatient_infoInput | room_registerCreateOrConnectWithoutPatient_infoInput[]
    createMany?: room_registerCreateManyPatient_infoInputEnvelope
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
  }

  export type bed_infoUncheckedCreateNestedManyWithoutPatient_infoInput = {
    create?: XOR<bed_infoCreateWithoutPatient_infoInput, bed_infoUncheckedCreateWithoutPatient_infoInput> | bed_infoCreateWithoutPatient_infoInput[] | bed_infoUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutPatient_infoInput | bed_infoCreateOrConnectWithoutPatient_infoInput[]
    createMany?: bed_infoCreateManyPatient_infoInputEnvelope
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
  }

  export type patient_uploadsUncheckedCreateNestedManyWithoutPatient_infoInput = {
    create?: XOR<patient_uploadsCreateWithoutPatient_infoInput, patient_uploadsUncheckedCreateWithoutPatient_infoInput> | patient_uploadsCreateWithoutPatient_infoInput[] | patient_uploadsUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: patient_uploadsCreateOrConnectWithoutPatient_infoInput | patient_uploadsCreateOrConnectWithoutPatient_infoInput[]
    createMany?: patient_uploadsCreateManyPatient_infoInputEnvelope
    connect?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
  }

  export type room_registerUncheckedCreateNestedManyWithoutPatient_infoInput = {
    create?: XOR<room_registerCreateWithoutPatient_infoInput, room_registerUncheckedCreateWithoutPatient_infoInput> | room_registerCreateWithoutPatient_infoInput[] | room_registerUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutPatient_infoInput | room_registerCreateOrConnectWithoutPatient_infoInput[]
    createMany?: room_registerCreateManyPatient_infoInputEnvelope
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type bed_infoUpdateManyWithoutPatient_infoNestedInput = {
    create?: XOR<bed_infoCreateWithoutPatient_infoInput, bed_infoUncheckedCreateWithoutPatient_infoInput> | bed_infoCreateWithoutPatient_infoInput[] | bed_infoUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutPatient_infoInput | bed_infoCreateOrConnectWithoutPatient_infoInput[]
    upsert?: bed_infoUpsertWithWhereUniqueWithoutPatient_infoInput | bed_infoUpsertWithWhereUniqueWithoutPatient_infoInput[]
    createMany?: bed_infoCreateManyPatient_infoInputEnvelope
    set?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    disconnect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    delete?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    update?: bed_infoUpdateWithWhereUniqueWithoutPatient_infoInput | bed_infoUpdateWithWhereUniqueWithoutPatient_infoInput[]
    updateMany?: bed_infoUpdateManyWithWhereWithoutPatient_infoInput | bed_infoUpdateManyWithWhereWithoutPatient_infoInput[]
    deleteMany?: bed_infoScalarWhereInput | bed_infoScalarWhereInput[]
  }

  export type medicalcenter_infoUpdateOneRequiredWithoutPatient_infoNestedInput = {
    create?: XOR<medicalcenter_infoCreateWithoutPatient_infoInput, medicalcenter_infoUncheckedCreateWithoutPatient_infoInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutPatient_infoInput
    upsert?: medicalcenter_infoUpsertWithoutPatient_infoInput
    connect?: medicalcenter_infoWhereUniqueInput
    update?: XOR<XOR<medicalcenter_infoUpdateToOneWithWhereWithoutPatient_infoInput, medicalcenter_infoUpdateWithoutPatient_infoInput>, medicalcenter_infoUncheckedUpdateWithoutPatient_infoInput>
  }

  export type patient_uploadsUpdateManyWithoutPatient_infoNestedInput = {
    create?: XOR<patient_uploadsCreateWithoutPatient_infoInput, patient_uploadsUncheckedCreateWithoutPatient_infoInput> | patient_uploadsCreateWithoutPatient_infoInput[] | patient_uploadsUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: patient_uploadsCreateOrConnectWithoutPatient_infoInput | patient_uploadsCreateOrConnectWithoutPatient_infoInput[]
    upsert?: patient_uploadsUpsertWithWhereUniqueWithoutPatient_infoInput | patient_uploadsUpsertWithWhereUniqueWithoutPatient_infoInput[]
    createMany?: patient_uploadsCreateManyPatient_infoInputEnvelope
    set?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
    disconnect?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
    delete?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
    connect?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
    update?: patient_uploadsUpdateWithWhereUniqueWithoutPatient_infoInput | patient_uploadsUpdateWithWhereUniqueWithoutPatient_infoInput[]
    updateMany?: patient_uploadsUpdateManyWithWhereWithoutPatient_infoInput | patient_uploadsUpdateManyWithWhereWithoutPatient_infoInput[]
    deleteMany?: patient_uploadsScalarWhereInput | patient_uploadsScalarWhereInput[]
  }

  export type room_registerUpdateManyWithoutPatient_infoNestedInput = {
    create?: XOR<room_registerCreateWithoutPatient_infoInput, room_registerUncheckedCreateWithoutPatient_infoInput> | room_registerCreateWithoutPatient_infoInput[] | room_registerUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutPatient_infoInput | room_registerCreateOrConnectWithoutPatient_infoInput[]
    upsert?: room_registerUpsertWithWhereUniqueWithoutPatient_infoInput | room_registerUpsertWithWhereUniqueWithoutPatient_infoInput[]
    createMany?: room_registerCreateManyPatient_infoInputEnvelope
    set?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    disconnect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    delete?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    update?: room_registerUpdateWithWhereUniqueWithoutPatient_infoInput | room_registerUpdateWithWhereUniqueWithoutPatient_infoInput[]
    updateMany?: room_registerUpdateManyWithWhereWithoutPatient_infoInput | room_registerUpdateManyWithWhereWithoutPatient_infoInput[]
    deleteMany?: room_registerScalarWhereInput | room_registerScalarWhereInput[]
  }

  export type bed_infoUncheckedUpdateManyWithoutPatient_infoNestedInput = {
    create?: XOR<bed_infoCreateWithoutPatient_infoInput, bed_infoUncheckedCreateWithoutPatient_infoInput> | bed_infoCreateWithoutPatient_infoInput[] | bed_infoUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutPatient_infoInput | bed_infoCreateOrConnectWithoutPatient_infoInput[]
    upsert?: bed_infoUpsertWithWhereUniqueWithoutPatient_infoInput | bed_infoUpsertWithWhereUniqueWithoutPatient_infoInput[]
    createMany?: bed_infoCreateManyPatient_infoInputEnvelope
    set?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    disconnect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    delete?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    update?: bed_infoUpdateWithWhereUniqueWithoutPatient_infoInput | bed_infoUpdateWithWhereUniqueWithoutPatient_infoInput[]
    updateMany?: bed_infoUpdateManyWithWhereWithoutPatient_infoInput | bed_infoUpdateManyWithWhereWithoutPatient_infoInput[]
    deleteMany?: bed_infoScalarWhereInput | bed_infoScalarWhereInput[]
  }

  export type patient_uploadsUncheckedUpdateManyWithoutPatient_infoNestedInput = {
    create?: XOR<patient_uploadsCreateWithoutPatient_infoInput, patient_uploadsUncheckedCreateWithoutPatient_infoInput> | patient_uploadsCreateWithoutPatient_infoInput[] | patient_uploadsUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: patient_uploadsCreateOrConnectWithoutPatient_infoInput | patient_uploadsCreateOrConnectWithoutPatient_infoInput[]
    upsert?: patient_uploadsUpsertWithWhereUniqueWithoutPatient_infoInput | patient_uploadsUpsertWithWhereUniqueWithoutPatient_infoInput[]
    createMany?: patient_uploadsCreateManyPatient_infoInputEnvelope
    set?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
    disconnect?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
    delete?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
    connect?: patient_uploadsWhereUniqueInput | patient_uploadsWhereUniqueInput[]
    update?: patient_uploadsUpdateWithWhereUniqueWithoutPatient_infoInput | patient_uploadsUpdateWithWhereUniqueWithoutPatient_infoInput[]
    updateMany?: patient_uploadsUpdateManyWithWhereWithoutPatient_infoInput | patient_uploadsUpdateManyWithWhereWithoutPatient_infoInput[]
    deleteMany?: patient_uploadsScalarWhereInput | patient_uploadsScalarWhereInput[]
  }

  export type room_registerUncheckedUpdateManyWithoutPatient_infoNestedInput = {
    create?: XOR<room_registerCreateWithoutPatient_infoInput, room_registerUncheckedCreateWithoutPatient_infoInput> | room_registerCreateWithoutPatient_infoInput[] | room_registerUncheckedCreateWithoutPatient_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutPatient_infoInput | room_registerCreateOrConnectWithoutPatient_infoInput[]
    upsert?: room_registerUpsertWithWhereUniqueWithoutPatient_infoInput | room_registerUpsertWithWhereUniqueWithoutPatient_infoInput[]
    createMany?: room_registerCreateManyPatient_infoInputEnvelope
    set?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    disconnect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    delete?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    update?: room_registerUpdateWithWhereUniqueWithoutPatient_infoInput | room_registerUpdateWithWhereUniqueWithoutPatient_infoInput[]
    updateMany?: room_registerUpdateManyWithWhereWithoutPatient_infoInput | room_registerUpdateManyWithWhereWithoutPatient_infoInput[]
    deleteMany?: room_registerScalarWhereInput | room_registerScalarWhereInput[]
  }

  export type patient_infoCreateNestedOneWithoutPatient_uploadsInput = {
    create?: XOR<patient_infoCreateWithoutPatient_uploadsInput, patient_infoUncheckedCreateWithoutPatient_uploadsInput>
    connectOrCreate?: patient_infoCreateOrConnectWithoutPatient_uploadsInput
    connect?: patient_infoWhereUniqueInput
  }

  export type patient_infoUpdateOneRequiredWithoutPatient_uploadsNestedInput = {
    create?: XOR<patient_infoCreateWithoutPatient_uploadsInput, patient_infoUncheckedCreateWithoutPatient_uploadsInput>
    connectOrCreate?: patient_infoCreateOrConnectWithoutPatient_uploadsInput
    upsert?: patient_infoUpsertWithoutPatient_uploadsInput
    connect?: patient_infoWhereUniqueInput
    update?: XOR<XOR<patient_infoUpdateToOneWithWhereWithoutPatient_uploadsInput, patient_infoUpdateWithoutPatient_uploadsInput>, patient_infoUncheckedUpdateWithoutPatient_uploadsInput>
  }

  export type bed_infoCreateNestedManyWithoutRoom_infoInput = {
    create?: XOR<bed_infoCreateWithoutRoom_infoInput, bed_infoUncheckedCreateWithoutRoom_infoInput> | bed_infoCreateWithoutRoom_infoInput[] | bed_infoUncheckedCreateWithoutRoom_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutRoom_infoInput | bed_infoCreateOrConnectWithoutRoom_infoInput[]
    createMany?: bed_infoCreateManyRoom_infoInputEnvelope
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
  }

  export type medicalcenter_infoCreateNestedOneWithoutRoom_infoInput = {
    create?: XOR<medicalcenter_infoCreateWithoutRoom_infoInput, medicalcenter_infoUncheckedCreateWithoutRoom_infoInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutRoom_infoInput
    connect?: medicalcenter_infoWhereUniqueInput
  }

  export type room_registerCreateNestedManyWithoutRoom_infoInput = {
    create?: XOR<room_registerCreateWithoutRoom_infoInput, room_registerUncheckedCreateWithoutRoom_infoInput> | room_registerCreateWithoutRoom_infoInput[] | room_registerUncheckedCreateWithoutRoom_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutRoom_infoInput | room_registerCreateOrConnectWithoutRoom_infoInput[]
    createMany?: room_registerCreateManyRoom_infoInputEnvelope
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
  }

  export type bed_infoUncheckedCreateNestedManyWithoutRoom_infoInput = {
    create?: XOR<bed_infoCreateWithoutRoom_infoInput, bed_infoUncheckedCreateWithoutRoom_infoInput> | bed_infoCreateWithoutRoom_infoInput[] | bed_infoUncheckedCreateWithoutRoom_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutRoom_infoInput | bed_infoCreateOrConnectWithoutRoom_infoInput[]
    createMany?: bed_infoCreateManyRoom_infoInputEnvelope
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
  }

  export type room_registerUncheckedCreateNestedManyWithoutRoom_infoInput = {
    create?: XOR<room_registerCreateWithoutRoom_infoInput, room_registerUncheckedCreateWithoutRoom_infoInput> | room_registerCreateWithoutRoom_infoInput[] | room_registerUncheckedCreateWithoutRoom_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutRoom_infoInput | room_registerCreateOrConnectWithoutRoom_infoInput[]
    createMany?: room_registerCreateManyRoom_infoInputEnvelope
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
  }

  export type bed_infoUpdateManyWithoutRoom_infoNestedInput = {
    create?: XOR<bed_infoCreateWithoutRoom_infoInput, bed_infoUncheckedCreateWithoutRoom_infoInput> | bed_infoCreateWithoutRoom_infoInput[] | bed_infoUncheckedCreateWithoutRoom_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutRoom_infoInput | bed_infoCreateOrConnectWithoutRoom_infoInput[]
    upsert?: bed_infoUpsertWithWhereUniqueWithoutRoom_infoInput | bed_infoUpsertWithWhereUniqueWithoutRoom_infoInput[]
    createMany?: bed_infoCreateManyRoom_infoInputEnvelope
    set?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    disconnect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    delete?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    update?: bed_infoUpdateWithWhereUniqueWithoutRoom_infoInput | bed_infoUpdateWithWhereUniqueWithoutRoom_infoInput[]
    updateMany?: bed_infoUpdateManyWithWhereWithoutRoom_infoInput | bed_infoUpdateManyWithWhereWithoutRoom_infoInput[]
    deleteMany?: bed_infoScalarWhereInput | bed_infoScalarWhereInput[]
  }

  export type medicalcenter_infoUpdateOneRequiredWithoutRoom_infoNestedInput = {
    create?: XOR<medicalcenter_infoCreateWithoutRoom_infoInput, medicalcenter_infoUncheckedCreateWithoutRoom_infoInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutRoom_infoInput
    upsert?: medicalcenter_infoUpsertWithoutRoom_infoInput
    connect?: medicalcenter_infoWhereUniqueInput
    update?: XOR<XOR<medicalcenter_infoUpdateToOneWithWhereWithoutRoom_infoInput, medicalcenter_infoUpdateWithoutRoom_infoInput>, medicalcenter_infoUncheckedUpdateWithoutRoom_infoInput>
  }

  export type room_registerUpdateManyWithoutRoom_infoNestedInput = {
    create?: XOR<room_registerCreateWithoutRoom_infoInput, room_registerUncheckedCreateWithoutRoom_infoInput> | room_registerCreateWithoutRoom_infoInput[] | room_registerUncheckedCreateWithoutRoom_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutRoom_infoInput | room_registerCreateOrConnectWithoutRoom_infoInput[]
    upsert?: room_registerUpsertWithWhereUniqueWithoutRoom_infoInput | room_registerUpsertWithWhereUniqueWithoutRoom_infoInput[]
    createMany?: room_registerCreateManyRoom_infoInputEnvelope
    set?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    disconnect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    delete?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    update?: room_registerUpdateWithWhereUniqueWithoutRoom_infoInput | room_registerUpdateWithWhereUniqueWithoutRoom_infoInput[]
    updateMany?: room_registerUpdateManyWithWhereWithoutRoom_infoInput | room_registerUpdateManyWithWhereWithoutRoom_infoInput[]
    deleteMany?: room_registerScalarWhereInput | room_registerScalarWhereInput[]
  }

  export type bed_infoUncheckedUpdateManyWithoutRoom_infoNestedInput = {
    create?: XOR<bed_infoCreateWithoutRoom_infoInput, bed_infoUncheckedCreateWithoutRoom_infoInput> | bed_infoCreateWithoutRoom_infoInput[] | bed_infoUncheckedCreateWithoutRoom_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutRoom_infoInput | bed_infoCreateOrConnectWithoutRoom_infoInput[]
    upsert?: bed_infoUpsertWithWhereUniqueWithoutRoom_infoInput | bed_infoUpsertWithWhereUniqueWithoutRoom_infoInput[]
    createMany?: bed_infoCreateManyRoom_infoInputEnvelope
    set?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    disconnect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    delete?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    update?: bed_infoUpdateWithWhereUniqueWithoutRoom_infoInput | bed_infoUpdateWithWhereUniqueWithoutRoom_infoInput[]
    updateMany?: bed_infoUpdateManyWithWhereWithoutRoom_infoInput | bed_infoUpdateManyWithWhereWithoutRoom_infoInput[]
    deleteMany?: bed_infoScalarWhereInput | bed_infoScalarWhereInput[]
  }

  export type room_registerUncheckedUpdateManyWithoutRoom_infoNestedInput = {
    create?: XOR<room_registerCreateWithoutRoom_infoInput, room_registerUncheckedCreateWithoutRoom_infoInput> | room_registerCreateWithoutRoom_infoInput[] | room_registerUncheckedCreateWithoutRoom_infoInput[]
    connectOrCreate?: room_registerCreateOrConnectWithoutRoom_infoInput | room_registerCreateOrConnectWithoutRoom_infoInput[]
    upsert?: room_registerUpsertWithWhereUniqueWithoutRoom_infoInput | room_registerUpsertWithWhereUniqueWithoutRoom_infoInput[]
    createMany?: room_registerCreateManyRoom_infoInputEnvelope
    set?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    disconnect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    delete?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    connect?: room_registerWhereUniqueInput | room_registerWhereUniqueInput[]
    update?: room_registerUpdateWithWhereUniqueWithoutRoom_infoInput | room_registerUpdateWithWhereUniqueWithoutRoom_infoInput[]
    updateMany?: room_registerUpdateManyWithWhereWithoutRoom_infoInput | room_registerUpdateManyWithWhereWithoutRoom_infoInput[]
    deleteMany?: room_registerScalarWhereInput | room_registerScalarWhereInput[]
  }

  export type room_dataCreateNestedManyWithoutBed_infoInput = {
    create?: XOR<room_dataCreateWithoutBed_infoInput, room_dataUncheckedCreateWithoutBed_infoInput> | room_dataCreateWithoutBed_infoInput[] | room_dataUncheckedCreateWithoutBed_infoInput[]
    connectOrCreate?: room_dataCreateOrConnectWithoutBed_infoInput | room_dataCreateOrConnectWithoutBed_infoInput[]
    createMany?: room_dataCreateManyBed_infoInputEnvelope
    connect?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
  }

  export type user_infoCreateNestedOneWithoutBed_infoInput = {
    create?: XOR<user_infoCreateWithoutBed_infoInput, user_infoUncheckedCreateWithoutBed_infoInput>
    connectOrCreate?: user_infoCreateOrConnectWithoutBed_infoInput
    connect?: user_infoWhereUniqueInput
  }

  export type patient_infoCreateNestedOneWithoutBed_infoInput = {
    create?: XOR<patient_infoCreateWithoutBed_infoInput, patient_infoUncheckedCreateWithoutBed_infoInput>
    connectOrCreate?: patient_infoCreateOrConnectWithoutBed_infoInput
    connect?: patient_infoWhereUniqueInput
  }

  export type room_infoCreateNestedOneWithoutBed_infoInput = {
    create?: XOR<room_infoCreateWithoutBed_infoInput, room_infoUncheckedCreateWithoutBed_infoInput>
    connectOrCreate?: room_infoCreateOrConnectWithoutBed_infoInput
    connect?: room_infoWhereUniqueInput
  }

  export type room_dataUncheckedCreateNestedManyWithoutBed_infoInput = {
    create?: XOR<room_dataCreateWithoutBed_infoInput, room_dataUncheckedCreateWithoutBed_infoInput> | room_dataCreateWithoutBed_infoInput[] | room_dataUncheckedCreateWithoutBed_infoInput[]
    connectOrCreate?: room_dataCreateOrConnectWithoutBed_infoInput | room_dataCreateOrConnectWithoutBed_infoInput[]
    createMany?: room_dataCreateManyBed_infoInputEnvelope
    connect?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
  }

  export type room_dataUpdateManyWithoutBed_infoNestedInput = {
    create?: XOR<room_dataCreateWithoutBed_infoInput, room_dataUncheckedCreateWithoutBed_infoInput> | room_dataCreateWithoutBed_infoInput[] | room_dataUncheckedCreateWithoutBed_infoInput[]
    connectOrCreate?: room_dataCreateOrConnectWithoutBed_infoInput | room_dataCreateOrConnectWithoutBed_infoInput[]
    upsert?: room_dataUpsertWithWhereUniqueWithoutBed_infoInput | room_dataUpsertWithWhereUniqueWithoutBed_infoInput[]
    createMany?: room_dataCreateManyBed_infoInputEnvelope
    set?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
    disconnect?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
    delete?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
    connect?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
    update?: room_dataUpdateWithWhereUniqueWithoutBed_infoInput | room_dataUpdateWithWhereUniqueWithoutBed_infoInput[]
    updateMany?: room_dataUpdateManyWithWhereWithoutBed_infoInput | room_dataUpdateManyWithWhereWithoutBed_infoInput[]
    deleteMany?: room_dataScalarWhereInput | room_dataScalarWhereInput[]
  }

  export type user_infoUpdateOneWithoutBed_infoNestedInput = {
    create?: XOR<user_infoCreateWithoutBed_infoInput, user_infoUncheckedCreateWithoutBed_infoInput>
    connectOrCreate?: user_infoCreateOrConnectWithoutBed_infoInput
    upsert?: user_infoUpsertWithoutBed_infoInput
    disconnect?: user_infoWhereInput | boolean
    delete?: user_infoWhereInput | boolean
    connect?: user_infoWhereUniqueInput
    update?: XOR<XOR<user_infoUpdateToOneWithWhereWithoutBed_infoInput, user_infoUpdateWithoutBed_infoInput>, user_infoUncheckedUpdateWithoutBed_infoInput>
  }

  export type patient_infoUpdateOneWithoutBed_infoNestedInput = {
    create?: XOR<patient_infoCreateWithoutBed_infoInput, patient_infoUncheckedCreateWithoutBed_infoInput>
    connectOrCreate?: patient_infoCreateOrConnectWithoutBed_infoInput
    upsert?: patient_infoUpsertWithoutBed_infoInput
    disconnect?: patient_infoWhereInput | boolean
    delete?: patient_infoWhereInput | boolean
    connect?: patient_infoWhereUniqueInput
    update?: XOR<XOR<patient_infoUpdateToOneWithWhereWithoutBed_infoInput, patient_infoUpdateWithoutBed_infoInput>, patient_infoUncheckedUpdateWithoutBed_infoInput>
  }

  export type room_infoUpdateOneRequiredWithoutBed_infoNestedInput = {
    create?: XOR<room_infoCreateWithoutBed_infoInput, room_infoUncheckedCreateWithoutBed_infoInput>
    connectOrCreate?: room_infoCreateOrConnectWithoutBed_infoInput
    upsert?: room_infoUpsertWithoutBed_infoInput
    connect?: room_infoWhereUniqueInput
    update?: XOR<XOR<room_infoUpdateToOneWithWhereWithoutBed_infoInput, room_infoUpdateWithoutBed_infoInput>, room_infoUncheckedUpdateWithoutBed_infoInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type room_dataUncheckedUpdateManyWithoutBed_infoNestedInput = {
    create?: XOR<room_dataCreateWithoutBed_infoInput, room_dataUncheckedCreateWithoutBed_infoInput> | room_dataCreateWithoutBed_infoInput[] | room_dataUncheckedCreateWithoutBed_infoInput[]
    connectOrCreate?: room_dataCreateOrConnectWithoutBed_infoInput | room_dataCreateOrConnectWithoutBed_infoInput[]
    upsert?: room_dataUpsertWithWhereUniqueWithoutBed_infoInput | room_dataUpsertWithWhereUniqueWithoutBed_infoInput[]
    createMany?: room_dataCreateManyBed_infoInputEnvelope
    set?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
    disconnect?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
    delete?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
    connect?: room_dataWhereUniqueInput | room_dataWhereUniqueInput[]
    update?: room_dataUpdateWithWhereUniqueWithoutBed_infoInput | room_dataUpdateWithWhereUniqueWithoutBed_infoInput[]
    updateMany?: room_dataUpdateManyWithWhereWithoutBed_infoInput | room_dataUpdateManyWithWhereWithoutBed_infoInput[]
    deleteMany?: room_dataScalarWhereInput | room_dataScalarWhereInput[]
  }

  export type bed_infoCreateNestedOneWithoutRoom_dataInput = {
    create?: XOR<bed_infoCreateWithoutRoom_dataInput, bed_infoUncheckedCreateWithoutRoom_dataInput>
    connectOrCreate?: bed_infoCreateOrConnectWithoutRoom_dataInput
    connect?: bed_infoWhereUniqueInput
  }

  export type bed_infoUpdateOneRequiredWithoutRoom_dataNestedInput = {
    create?: XOR<bed_infoCreateWithoutRoom_dataInput, bed_infoUncheckedCreateWithoutRoom_dataInput>
    connectOrCreate?: bed_infoCreateOrConnectWithoutRoom_dataInput
    upsert?: bed_infoUpsertWithoutRoom_dataInput
    connect?: bed_infoWhereUniqueInput
    update?: XOR<XOR<bed_infoUpdateToOneWithWhereWithoutRoom_dataInput, bed_infoUpdateWithoutRoom_dataInput>, bed_infoUncheckedUpdateWithoutRoom_dataInput>
  }

  export type medicalcenter_infoCreateNestedOneWithoutRoom_registerInput = {
    create?: XOR<medicalcenter_infoCreateWithoutRoom_registerInput, medicalcenter_infoUncheckedCreateWithoutRoom_registerInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutRoom_registerInput
    connect?: medicalcenter_infoWhereUniqueInput
  }

  export type patient_infoCreateNestedOneWithoutRoom_registerInput = {
    create?: XOR<patient_infoCreateWithoutRoom_registerInput, patient_infoUncheckedCreateWithoutRoom_registerInput>
    connectOrCreate?: patient_infoCreateOrConnectWithoutRoom_registerInput
    connect?: patient_infoWhereUniqueInput
  }

  export type room_infoCreateNestedOneWithoutRoom_registerInput = {
    create?: XOR<room_infoCreateWithoutRoom_registerInput, room_infoUncheckedCreateWithoutRoom_registerInput>
    connectOrCreate?: room_infoCreateOrConnectWithoutRoom_registerInput
    connect?: room_infoWhereUniqueInput
  }

  export type medicalcenter_infoUpdateOneRequiredWithoutRoom_registerNestedInput = {
    create?: XOR<medicalcenter_infoCreateWithoutRoom_registerInput, medicalcenter_infoUncheckedCreateWithoutRoom_registerInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutRoom_registerInput
    upsert?: medicalcenter_infoUpsertWithoutRoom_registerInput
    connect?: medicalcenter_infoWhereUniqueInput
    update?: XOR<XOR<medicalcenter_infoUpdateToOneWithWhereWithoutRoom_registerInput, medicalcenter_infoUpdateWithoutRoom_registerInput>, medicalcenter_infoUncheckedUpdateWithoutRoom_registerInput>
  }

  export type patient_infoUpdateOneRequiredWithoutRoom_registerNestedInput = {
    create?: XOR<patient_infoCreateWithoutRoom_registerInput, patient_infoUncheckedCreateWithoutRoom_registerInput>
    connectOrCreate?: patient_infoCreateOrConnectWithoutRoom_registerInput
    upsert?: patient_infoUpsertWithoutRoom_registerInput
    connect?: patient_infoWhereUniqueInput
    update?: XOR<XOR<patient_infoUpdateToOneWithWhereWithoutRoom_registerInput, patient_infoUpdateWithoutRoom_registerInput>, patient_infoUncheckedUpdateWithoutRoom_registerInput>
  }

  export type room_infoUpdateOneRequiredWithoutRoom_registerNestedInput = {
    create?: XOR<room_infoCreateWithoutRoom_registerInput, room_infoUncheckedCreateWithoutRoom_registerInput>
    connectOrCreate?: room_infoCreateOrConnectWithoutRoom_registerInput
    upsert?: room_infoUpsertWithoutRoom_registerInput
    connect?: room_infoWhereUniqueInput
    update?: XOR<XOR<room_infoUpdateToOneWithWhereWithoutRoom_registerInput, room_infoUpdateWithoutRoom_registerInput>, room_infoUncheckedUpdateWithoutRoom_registerInput>
  }

  export type bed_infoCreateNestedManyWithoutUser_infoInput = {
    create?: XOR<bed_infoCreateWithoutUser_infoInput, bed_infoUncheckedCreateWithoutUser_infoInput> | bed_infoCreateWithoutUser_infoInput[] | bed_infoUncheckedCreateWithoutUser_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutUser_infoInput | bed_infoCreateOrConnectWithoutUser_infoInput[]
    createMany?: bed_infoCreateManyUser_infoInputEnvelope
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
  }

  export type medicalcenter_infoCreateNestedOneWithoutUser_infoInput = {
    create?: XOR<medicalcenter_infoCreateWithoutUser_infoInput, medicalcenter_infoUncheckedCreateWithoutUser_infoInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutUser_infoInput
    connect?: medicalcenter_infoWhereUniqueInput
  }

  export type user_uploadsCreateNestedManyWithoutUser_infoInput = {
    create?: XOR<user_uploadsCreateWithoutUser_infoInput, user_uploadsUncheckedCreateWithoutUser_infoInput> | user_uploadsCreateWithoutUser_infoInput[] | user_uploadsUncheckedCreateWithoutUser_infoInput[]
    connectOrCreate?: user_uploadsCreateOrConnectWithoutUser_infoInput | user_uploadsCreateOrConnectWithoutUser_infoInput[]
    createMany?: user_uploadsCreateManyUser_infoInputEnvelope
    connect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
  }

  export type bed_infoUncheckedCreateNestedManyWithoutUser_infoInput = {
    create?: XOR<bed_infoCreateWithoutUser_infoInput, bed_infoUncheckedCreateWithoutUser_infoInput> | bed_infoCreateWithoutUser_infoInput[] | bed_infoUncheckedCreateWithoutUser_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutUser_infoInput | bed_infoCreateOrConnectWithoutUser_infoInput[]
    createMany?: bed_infoCreateManyUser_infoInputEnvelope
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
  }

  export type user_uploadsUncheckedCreateNestedManyWithoutUser_infoInput = {
    create?: XOR<user_uploadsCreateWithoutUser_infoInput, user_uploadsUncheckedCreateWithoutUser_infoInput> | user_uploadsCreateWithoutUser_infoInput[] | user_uploadsUncheckedCreateWithoutUser_infoInput[]
    connectOrCreate?: user_uploadsCreateOrConnectWithoutUser_infoInput | user_uploadsCreateOrConnectWithoutUser_infoInput[]
    createMany?: user_uploadsCreateManyUser_infoInputEnvelope
    connect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
  }

  export type bed_infoUpdateManyWithoutUser_infoNestedInput = {
    create?: XOR<bed_infoCreateWithoutUser_infoInput, bed_infoUncheckedCreateWithoutUser_infoInput> | bed_infoCreateWithoutUser_infoInput[] | bed_infoUncheckedCreateWithoutUser_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutUser_infoInput | bed_infoCreateOrConnectWithoutUser_infoInput[]
    upsert?: bed_infoUpsertWithWhereUniqueWithoutUser_infoInput | bed_infoUpsertWithWhereUniqueWithoutUser_infoInput[]
    createMany?: bed_infoCreateManyUser_infoInputEnvelope
    set?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    disconnect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    delete?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    update?: bed_infoUpdateWithWhereUniqueWithoutUser_infoInput | bed_infoUpdateWithWhereUniqueWithoutUser_infoInput[]
    updateMany?: bed_infoUpdateManyWithWhereWithoutUser_infoInput | bed_infoUpdateManyWithWhereWithoutUser_infoInput[]
    deleteMany?: bed_infoScalarWhereInput | bed_infoScalarWhereInput[]
  }

  export type medicalcenter_infoUpdateOneRequiredWithoutUser_infoNestedInput = {
    create?: XOR<medicalcenter_infoCreateWithoutUser_infoInput, medicalcenter_infoUncheckedCreateWithoutUser_infoInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutUser_infoInput
    upsert?: medicalcenter_infoUpsertWithoutUser_infoInput
    connect?: medicalcenter_infoWhereUniqueInput
    update?: XOR<XOR<medicalcenter_infoUpdateToOneWithWhereWithoutUser_infoInput, medicalcenter_infoUpdateWithoutUser_infoInput>, medicalcenter_infoUncheckedUpdateWithoutUser_infoInput>
  }

  export type user_uploadsUpdateManyWithoutUser_infoNestedInput = {
    create?: XOR<user_uploadsCreateWithoutUser_infoInput, user_uploadsUncheckedCreateWithoutUser_infoInput> | user_uploadsCreateWithoutUser_infoInput[] | user_uploadsUncheckedCreateWithoutUser_infoInput[]
    connectOrCreate?: user_uploadsCreateOrConnectWithoutUser_infoInput | user_uploadsCreateOrConnectWithoutUser_infoInput[]
    upsert?: user_uploadsUpsertWithWhereUniqueWithoutUser_infoInput | user_uploadsUpsertWithWhereUniqueWithoutUser_infoInput[]
    createMany?: user_uploadsCreateManyUser_infoInputEnvelope
    set?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    disconnect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    delete?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    connect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    update?: user_uploadsUpdateWithWhereUniqueWithoutUser_infoInput | user_uploadsUpdateWithWhereUniqueWithoutUser_infoInput[]
    updateMany?: user_uploadsUpdateManyWithWhereWithoutUser_infoInput | user_uploadsUpdateManyWithWhereWithoutUser_infoInput[]
    deleteMany?: user_uploadsScalarWhereInput | user_uploadsScalarWhereInput[]
  }

  export type bed_infoUncheckedUpdateManyWithoutUser_infoNestedInput = {
    create?: XOR<bed_infoCreateWithoutUser_infoInput, bed_infoUncheckedCreateWithoutUser_infoInput> | bed_infoCreateWithoutUser_infoInput[] | bed_infoUncheckedCreateWithoutUser_infoInput[]
    connectOrCreate?: bed_infoCreateOrConnectWithoutUser_infoInput | bed_infoCreateOrConnectWithoutUser_infoInput[]
    upsert?: bed_infoUpsertWithWhereUniqueWithoutUser_infoInput | bed_infoUpsertWithWhereUniqueWithoutUser_infoInput[]
    createMany?: bed_infoCreateManyUser_infoInputEnvelope
    set?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    disconnect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    delete?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    connect?: bed_infoWhereUniqueInput | bed_infoWhereUniqueInput[]
    update?: bed_infoUpdateWithWhereUniqueWithoutUser_infoInput | bed_infoUpdateWithWhereUniqueWithoutUser_infoInput[]
    updateMany?: bed_infoUpdateManyWithWhereWithoutUser_infoInput | bed_infoUpdateManyWithWhereWithoutUser_infoInput[]
    deleteMany?: bed_infoScalarWhereInput | bed_infoScalarWhereInput[]
  }

  export type user_uploadsUncheckedUpdateManyWithoutUser_infoNestedInput = {
    create?: XOR<user_uploadsCreateWithoutUser_infoInput, user_uploadsUncheckedCreateWithoutUser_infoInput> | user_uploadsCreateWithoutUser_infoInput[] | user_uploadsUncheckedCreateWithoutUser_infoInput[]
    connectOrCreate?: user_uploadsCreateOrConnectWithoutUser_infoInput | user_uploadsCreateOrConnectWithoutUser_infoInput[]
    upsert?: user_uploadsUpsertWithWhereUniqueWithoutUser_infoInput | user_uploadsUpsertWithWhereUniqueWithoutUser_infoInput[]
    createMany?: user_uploadsCreateManyUser_infoInputEnvelope
    set?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    disconnect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    delete?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    connect?: user_uploadsWhereUniqueInput | user_uploadsWhereUniqueInput[]
    update?: user_uploadsUpdateWithWhereUniqueWithoutUser_infoInput | user_uploadsUpdateWithWhereUniqueWithoutUser_infoInput[]
    updateMany?: user_uploadsUpdateManyWithWhereWithoutUser_infoInput | user_uploadsUpdateManyWithWhereWithoutUser_infoInput[]
    deleteMany?: user_uploadsScalarWhereInput | user_uploadsScalarWhereInput[]
  }

  export type medicalcenter_infoCreateNestedOneWithoutUser_uploadsInput = {
    create?: XOR<medicalcenter_infoCreateWithoutUser_uploadsInput, medicalcenter_infoUncheckedCreateWithoutUser_uploadsInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutUser_uploadsInput
    connect?: medicalcenter_infoWhereUniqueInput
  }

  export type user_infoCreateNestedOneWithoutUser_uploadsInput = {
    create?: XOR<user_infoCreateWithoutUser_uploadsInput, user_infoUncheckedCreateWithoutUser_uploadsInput>
    connectOrCreate?: user_infoCreateOrConnectWithoutUser_uploadsInput
    connect?: user_infoWhereUniqueInput
  }

  export type medicalcenter_infoUpdateOneRequiredWithoutUser_uploadsNestedInput = {
    create?: XOR<medicalcenter_infoCreateWithoutUser_uploadsInput, medicalcenter_infoUncheckedCreateWithoutUser_uploadsInput>
    connectOrCreate?: medicalcenter_infoCreateOrConnectWithoutUser_uploadsInput
    upsert?: medicalcenter_infoUpsertWithoutUser_uploadsInput
    connect?: medicalcenter_infoWhereUniqueInput
    update?: XOR<XOR<medicalcenter_infoUpdateToOneWithWhereWithoutUser_uploadsInput, medicalcenter_infoUpdateWithoutUser_uploadsInput>, medicalcenter_infoUncheckedUpdateWithoutUser_uploadsInput>
  }

  export type user_infoUpdateOneRequiredWithoutUser_uploadsNestedInput = {
    create?: XOR<user_infoCreateWithoutUser_uploadsInput, user_infoUncheckedCreateWithoutUser_uploadsInput>
    connectOrCreate?: user_infoCreateOrConnectWithoutUser_uploadsInput
    upsert?: user_infoUpsertWithoutUser_uploadsInput
    connect?: user_infoWhereUniqueInput
    update?: XOR<XOR<user_infoUpdateToOneWithWhereWithoutUser_uploadsInput, user_infoUpdateWithoutUser_uploadsInput>, user_infoUncheckedUpdateWithoutUser_uploadsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type patient_infoCreateWithoutMedicalcenter_infoInput = {
    patient_name: string
    registered_date: Date | string
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    bed_info?: bed_infoCreateNestedManyWithoutPatient_infoInput
    patient_uploads?: patient_uploadsCreateNestedManyWithoutPatient_infoInput
    room_register?: room_registerCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoUncheckedCreateWithoutMedicalcenter_infoInput = {
    patient_id?: number
    patient_name: string
    registered_date: Date | string
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutPatient_infoInput
    patient_uploads?: patient_uploadsUncheckedCreateNestedManyWithoutPatient_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoCreateOrConnectWithoutMedicalcenter_infoInput = {
    where: patient_infoWhereUniqueInput
    create: XOR<patient_infoCreateWithoutMedicalcenter_infoInput, patient_infoUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type patient_infoCreateManyMedicalcenter_infoInputEnvelope = {
    data: patient_infoCreateManyMedicalcenter_infoInput | patient_infoCreateManyMedicalcenter_infoInput[]
    skipDuplicates?: boolean
  }

  export type room_infoCreateWithoutMedicalcenter_infoInput = {
    room_number: number
    number_of_beds: number
    is_full?: boolean
    bed_info?: bed_infoCreateNestedManyWithoutRoom_infoInput
    room_register?: room_registerCreateNestedManyWithoutRoom_infoInput
  }

  export type room_infoUncheckedCreateWithoutMedicalcenter_infoInput = {
    room_id?: number
    room_number: number
    number_of_beds: number
    is_full?: boolean
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutRoom_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutRoom_infoInput
  }

  export type room_infoCreateOrConnectWithoutMedicalcenter_infoInput = {
    where: room_infoWhereUniqueInput
    create: XOR<room_infoCreateWithoutMedicalcenter_infoInput, room_infoUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type room_infoCreateManyMedicalcenter_infoInputEnvelope = {
    data: room_infoCreateManyMedicalcenter_infoInput | room_infoCreateManyMedicalcenter_infoInput[]
    skipDuplicates?: boolean
  }

  export type room_registerCreateWithoutMedicalcenter_infoInput = {
    session_id: number
    reg_date: Date | string
    reg_time: Date | string
    patient_info: patient_infoCreateNestedOneWithoutRoom_registerInput
    room_info: room_infoCreateNestedOneWithoutRoom_registerInput
  }

  export type room_registerUncheckedCreateWithoutMedicalcenter_infoInput = {
    room_id: number
    patient_id: number
    session_id: number
    reg_date: Date | string
    reg_time: Date | string
  }

  export type room_registerCreateOrConnectWithoutMedicalcenter_infoInput = {
    where: room_registerWhereUniqueInput
    create: XOR<room_registerCreateWithoutMedicalcenter_infoInput, room_registerUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type room_registerCreateManyMedicalcenter_infoInputEnvelope = {
    data: room_registerCreateManyMedicalcenter_infoInput | room_registerCreateManyMedicalcenter_infoInput[]
    skipDuplicates?: boolean
  }

  export type user_infoCreateWithoutMedicalcenter_infoInput = {
    user_name: string
    staff_id: string
    password: string
    user_role: string
    charter_id: string
    bed_info?: bed_infoCreateNestedManyWithoutUser_infoInput
    user_uploads?: user_uploadsCreateNestedManyWithoutUser_infoInput
  }

  export type user_infoUncheckedCreateWithoutMedicalcenter_infoInput = {
    user_id?: number
    user_name: string
    staff_id: string
    password: string
    user_role: string
    charter_id: string
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutUser_infoInput
    user_uploads?: user_uploadsUncheckedCreateNestedManyWithoutUser_infoInput
  }

  export type user_infoCreateOrConnectWithoutMedicalcenter_infoInput = {
    where: user_infoWhereUniqueInput
    create: XOR<user_infoCreateWithoutMedicalcenter_infoInput, user_infoUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type user_infoCreateManyMedicalcenter_infoInputEnvelope = {
    data: user_infoCreateManyMedicalcenter_infoInput | user_infoCreateManyMedicalcenter_infoInput[]
    skipDuplicates?: boolean
  }

  export type user_uploadsCreateWithoutMedicalcenter_infoInput = {
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
    user_info: user_infoCreateNestedOneWithoutUser_uploadsInput
  }

  export type user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput = {
    user_id: number
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
  }

  export type user_uploadsCreateOrConnectWithoutMedicalcenter_infoInput = {
    where: user_uploadsWhereUniqueInput
    create: XOR<user_uploadsCreateWithoutMedicalcenter_infoInput, user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type user_uploadsCreateManyMedicalcenter_infoInputEnvelope = {
    data: user_uploadsCreateManyMedicalcenter_infoInput | user_uploadsCreateManyMedicalcenter_infoInput[]
    skipDuplicates?: boolean
  }

  export type patient_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: patient_infoWhereUniqueInput
    update: XOR<patient_infoUpdateWithoutMedicalcenter_infoInput, patient_infoUncheckedUpdateWithoutMedicalcenter_infoInput>
    create: XOR<patient_infoCreateWithoutMedicalcenter_infoInput, patient_infoUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type patient_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: patient_infoWhereUniqueInput
    data: XOR<patient_infoUpdateWithoutMedicalcenter_infoInput, patient_infoUncheckedUpdateWithoutMedicalcenter_infoInput>
  }

  export type patient_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput = {
    where: patient_infoScalarWhereInput
    data: XOR<patient_infoUpdateManyMutationInput, patient_infoUncheckedUpdateManyWithoutMedicalcenter_infoInput>
  }

  export type patient_infoScalarWhereInput = {
    AND?: patient_infoScalarWhereInput | patient_infoScalarWhereInput[]
    OR?: patient_infoScalarWhereInput[]
    NOT?: patient_infoScalarWhereInput | patient_infoScalarWhereInput[]
    patient_id?: IntFilter<"patient_info"> | number
    patient_name?: StringFilter<"patient_info"> | string
    registered_date?: DateTimeFilter<"patient_info"> | Date | string
    center_id?: IntFilter<"patient_info"> | number
    dicharged_date?: DateTimeNullableFilter<"patient_info"> | Date | string | null
    is_discharged?: BoolFilter<"patient_info"> | boolean
  }

  export type room_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: room_infoWhereUniqueInput
    update: XOR<room_infoUpdateWithoutMedicalcenter_infoInput, room_infoUncheckedUpdateWithoutMedicalcenter_infoInput>
    create: XOR<room_infoCreateWithoutMedicalcenter_infoInput, room_infoUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type room_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: room_infoWhereUniqueInput
    data: XOR<room_infoUpdateWithoutMedicalcenter_infoInput, room_infoUncheckedUpdateWithoutMedicalcenter_infoInput>
  }

  export type room_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput = {
    where: room_infoScalarWhereInput
    data: XOR<room_infoUpdateManyMutationInput, room_infoUncheckedUpdateManyWithoutMedicalcenter_infoInput>
  }

  export type room_infoScalarWhereInput = {
    AND?: room_infoScalarWhereInput | room_infoScalarWhereInput[]
    OR?: room_infoScalarWhereInput[]
    NOT?: room_infoScalarWhereInput | room_infoScalarWhereInput[]
    room_id?: IntFilter<"room_info"> | number
    room_number?: IntFilter<"room_info"> | number
    center_id?: IntFilter<"room_info"> | number
    number_of_beds?: IntFilter<"room_info"> | number
    is_full?: BoolFilter<"room_info"> | boolean
  }

  export type room_registerUpsertWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: room_registerWhereUniqueInput
    update: XOR<room_registerUpdateWithoutMedicalcenter_infoInput, room_registerUncheckedUpdateWithoutMedicalcenter_infoInput>
    create: XOR<room_registerCreateWithoutMedicalcenter_infoInput, room_registerUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type room_registerUpdateWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: room_registerWhereUniqueInput
    data: XOR<room_registerUpdateWithoutMedicalcenter_infoInput, room_registerUncheckedUpdateWithoutMedicalcenter_infoInput>
  }

  export type room_registerUpdateManyWithWhereWithoutMedicalcenter_infoInput = {
    where: room_registerScalarWhereInput
    data: XOR<room_registerUpdateManyMutationInput, room_registerUncheckedUpdateManyWithoutMedicalcenter_infoInput>
  }

  export type room_registerScalarWhereInput = {
    AND?: room_registerScalarWhereInput | room_registerScalarWhereInput[]
    OR?: room_registerScalarWhereInput[]
    NOT?: room_registerScalarWhereInput | room_registerScalarWhereInput[]
    room_id?: IntFilter<"room_register"> | number
    patient_id?: IntFilter<"room_register"> | number
    session_id?: IntFilter<"room_register"> | number
    center_id?: IntFilter<"room_register"> | number
    reg_date?: DateTimeFilter<"room_register"> | Date | string
    reg_time?: DateTimeFilter<"room_register"> | Date | string
  }

  export type user_infoUpsertWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: user_infoWhereUniqueInput
    update: XOR<user_infoUpdateWithoutMedicalcenter_infoInput, user_infoUncheckedUpdateWithoutMedicalcenter_infoInput>
    create: XOR<user_infoCreateWithoutMedicalcenter_infoInput, user_infoUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type user_infoUpdateWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: user_infoWhereUniqueInput
    data: XOR<user_infoUpdateWithoutMedicalcenter_infoInput, user_infoUncheckedUpdateWithoutMedicalcenter_infoInput>
  }

  export type user_infoUpdateManyWithWhereWithoutMedicalcenter_infoInput = {
    where: user_infoScalarWhereInput
    data: XOR<user_infoUpdateManyMutationInput, user_infoUncheckedUpdateManyWithoutMedicalcenter_infoInput>
  }

  export type user_infoScalarWhereInput = {
    AND?: user_infoScalarWhereInput | user_infoScalarWhereInput[]
    OR?: user_infoScalarWhereInput[]
    NOT?: user_infoScalarWhereInput | user_infoScalarWhereInput[]
    user_id?: IntFilter<"user_info"> | number
    user_name?: StringFilter<"user_info"> | string
    staff_id?: StringFilter<"user_info"> | string
    password?: StringFilter<"user_info"> | string
    user_role?: StringFilter<"user_info"> | string
    center_id?: IntFilter<"user_info"> | number
    charter_id?: StringFilter<"user_info"> | string
  }

  export type user_uploadsUpsertWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: user_uploadsWhereUniqueInput
    update: XOR<user_uploadsUpdateWithoutMedicalcenter_infoInput, user_uploadsUncheckedUpdateWithoutMedicalcenter_infoInput>
    create: XOR<user_uploadsCreateWithoutMedicalcenter_infoInput, user_uploadsUncheckedCreateWithoutMedicalcenter_infoInput>
  }

  export type user_uploadsUpdateWithWhereUniqueWithoutMedicalcenter_infoInput = {
    where: user_uploadsWhereUniqueInput
    data: XOR<user_uploadsUpdateWithoutMedicalcenter_infoInput, user_uploadsUncheckedUpdateWithoutMedicalcenter_infoInput>
  }

  export type user_uploadsUpdateManyWithWhereWithoutMedicalcenter_infoInput = {
    where: user_uploadsScalarWhereInput
    data: XOR<user_uploadsUpdateManyMutationInput, user_uploadsUncheckedUpdateManyWithoutMedicalcenter_infoInput>
  }

  export type user_uploadsScalarWhereInput = {
    AND?: user_uploadsScalarWhereInput | user_uploadsScalarWhereInput[]
    OR?: user_uploadsScalarWhereInput[]
    NOT?: user_uploadsScalarWhereInput | user_uploadsScalarWhereInput[]
    user_id?: IntFilter<"user_uploads"> | number
    center_id?: IntFilter<"user_uploads"> | number
    upload_path?: StringFilter<"user_uploads"> | string
    unassigned_uploads?: StringFilter<"user_uploads"> | string
    upload_date?: DateTimeFilter<"user_uploads"> | Date | string
    upload_time?: DateTimeFilter<"user_uploads"> | Date | string
  }

  export type bed_infoCreateWithoutPatient_infoInput = {
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    room_data?: room_dataCreateNestedManyWithoutBed_infoInput
    user_info?: user_infoCreateNestedOneWithoutBed_infoInput
    room_info: room_infoCreateNestedOneWithoutBed_infoInput
  }

  export type bed_infoUncheckedCreateWithoutPatient_infoInput = {
    bed_id?: number
    room_id: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_nurse_id?: number | null
    room_data?: room_dataUncheckedCreateNestedManyWithoutBed_infoInput
  }

  export type bed_infoCreateOrConnectWithoutPatient_infoInput = {
    where: bed_infoWhereUniqueInput
    create: XOR<bed_infoCreateWithoutPatient_infoInput, bed_infoUncheckedCreateWithoutPatient_infoInput>
  }

  export type bed_infoCreateManyPatient_infoInputEnvelope = {
    data: bed_infoCreateManyPatient_infoInput | bed_infoCreateManyPatient_infoInput[]
    skipDuplicates?: boolean
  }

  export type medicalcenter_infoCreateWithoutPatient_infoInput = {
    center_name: string
    address?: string | null
    email?: string | null
    room_info?: room_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoUncheckedCreateWithoutPatient_infoInput = {
    center_id?: number
    center_name: string
    address?: string | null
    email?: string | null
    room_info?: room_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoCreateOrConnectWithoutPatient_infoInput = {
    where: medicalcenter_infoWhereUniqueInput
    create: XOR<medicalcenter_infoCreateWithoutPatient_infoInput, medicalcenter_infoUncheckedCreateWithoutPatient_infoInput>
  }

  export type patient_uploadsCreateWithoutPatient_infoInput = {
    session_id: number
    upload_path: string
    patient_notes: string
    upload_time: Date | string
  }

  export type patient_uploadsUncheckedCreateWithoutPatient_infoInput = {
    session_id: number
    upload_path: string
    patient_notes: string
    upload_time: Date | string
  }

  export type patient_uploadsCreateOrConnectWithoutPatient_infoInput = {
    where: patient_uploadsWhereUniqueInput
    create: XOR<patient_uploadsCreateWithoutPatient_infoInput, patient_uploadsUncheckedCreateWithoutPatient_infoInput>
  }

  export type patient_uploadsCreateManyPatient_infoInputEnvelope = {
    data: patient_uploadsCreateManyPatient_infoInput | patient_uploadsCreateManyPatient_infoInput[]
    skipDuplicates?: boolean
  }

  export type room_registerCreateWithoutPatient_infoInput = {
    session_id: number
    reg_date: Date | string
    reg_time: Date | string
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutRoom_registerInput
    room_info: room_infoCreateNestedOneWithoutRoom_registerInput
  }

  export type room_registerUncheckedCreateWithoutPatient_infoInput = {
    room_id: number
    session_id: number
    center_id: number
    reg_date: Date | string
    reg_time: Date | string
  }

  export type room_registerCreateOrConnectWithoutPatient_infoInput = {
    where: room_registerWhereUniqueInput
    create: XOR<room_registerCreateWithoutPatient_infoInput, room_registerUncheckedCreateWithoutPatient_infoInput>
  }

  export type room_registerCreateManyPatient_infoInputEnvelope = {
    data: room_registerCreateManyPatient_infoInput | room_registerCreateManyPatient_infoInput[]
    skipDuplicates?: boolean
  }

  export type bed_infoUpsertWithWhereUniqueWithoutPatient_infoInput = {
    where: bed_infoWhereUniqueInput
    update: XOR<bed_infoUpdateWithoutPatient_infoInput, bed_infoUncheckedUpdateWithoutPatient_infoInput>
    create: XOR<bed_infoCreateWithoutPatient_infoInput, bed_infoUncheckedCreateWithoutPatient_infoInput>
  }

  export type bed_infoUpdateWithWhereUniqueWithoutPatient_infoInput = {
    where: bed_infoWhereUniqueInput
    data: XOR<bed_infoUpdateWithoutPatient_infoInput, bed_infoUncheckedUpdateWithoutPatient_infoInput>
  }

  export type bed_infoUpdateManyWithWhereWithoutPatient_infoInput = {
    where: bed_infoScalarWhereInput
    data: XOR<bed_infoUpdateManyMutationInput, bed_infoUncheckedUpdateManyWithoutPatient_infoInput>
  }

  export type bed_infoScalarWhereInput = {
    AND?: bed_infoScalarWhereInput | bed_infoScalarWhereInput[]
    OR?: bed_infoScalarWhereInput[]
    NOT?: bed_infoScalarWhereInput | bed_infoScalarWhereInput[]
    bed_id?: IntFilter<"bed_info"> | number
    room_id?: IntFilter<"bed_info"> | number
    bed_letter?: StringFilter<"bed_info"> | string
    is_available?: BoolFilter<"bed_info"> | boolean
    is_assigned?: BoolFilter<"bed_info"> | boolean
    assigned_patient_id?: IntNullableFilter<"bed_info"> | number | null
    assigned_nurse_id?: IntNullableFilter<"bed_info"> | number | null
  }

  export type medicalcenter_infoUpsertWithoutPatient_infoInput = {
    update: XOR<medicalcenter_infoUpdateWithoutPatient_infoInput, medicalcenter_infoUncheckedUpdateWithoutPatient_infoInput>
    create: XOR<medicalcenter_infoCreateWithoutPatient_infoInput, medicalcenter_infoUncheckedCreateWithoutPatient_infoInput>
    where?: medicalcenter_infoWhereInput
  }

  export type medicalcenter_infoUpdateToOneWithWhereWithoutPatient_infoInput = {
    where?: medicalcenter_infoWhereInput
    data: XOR<medicalcenter_infoUpdateWithoutPatient_infoInput, medicalcenter_infoUncheckedUpdateWithoutPatient_infoInput>
  }

  export type medicalcenter_infoUpdateWithoutPatient_infoInput = {
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    room_info?: room_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type medicalcenter_infoUncheckedUpdateWithoutPatient_infoInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    room_info?: room_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type patient_uploadsUpsertWithWhereUniqueWithoutPatient_infoInput = {
    where: patient_uploadsWhereUniqueInput
    update: XOR<patient_uploadsUpdateWithoutPatient_infoInput, patient_uploadsUncheckedUpdateWithoutPatient_infoInput>
    create: XOR<patient_uploadsCreateWithoutPatient_infoInput, patient_uploadsUncheckedCreateWithoutPatient_infoInput>
  }

  export type patient_uploadsUpdateWithWhereUniqueWithoutPatient_infoInput = {
    where: patient_uploadsWhereUniqueInput
    data: XOR<patient_uploadsUpdateWithoutPatient_infoInput, patient_uploadsUncheckedUpdateWithoutPatient_infoInput>
  }

  export type patient_uploadsUpdateManyWithWhereWithoutPatient_infoInput = {
    where: patient_uploadsScalarWhereInput
    data: XOR<patient_uploadsUpdateManyMutationInput, patient_uploadsUncheckedUpdateManyWithoutPatient_infoInput>
  }

  export type patient_uploadsScalarWhereInput = {
    AND?: patient_uploadsScalarWhereInput | patient_uploadsScalarWhereInput[]
    OR?: patient_uploadsScalarWhereInput[]
    NOT?: patient_uploadsScalarWhereInput | patient_uploadsScalarWhereInput[]
    patient_id?: IntFilter<"patient_uploads"> | number
    session_id?: IntFilter<"patient_uploads"> | number
    upload_path?: StringFilter<"patient_uploads"> | string
    patient_notes?: StringFilter<"patient_uploads"> | string
    upload_time?: DateTimeFilter<"patient_uploads"> | Date | string
  }

  export type room_registerUpsertWithWhereUniqueWithoutPatient_infoInput = {
    where: room_registerWhereUniqueInput
    update: XOR<room_registerUpdateWithoutPatient_infoInput, room_registerUncheckedUpdateWithoutPatient_infoInput>
    create: XOR<room_registerCreateWithoutPatient_infoInput, room_registerUncheckedCreateWithoutPatient_infoInput>
  }

  export type room_registerUpdateWithWhereUniqueWithoutPatient_infoInput = {
    where: room_registerWhereUniqueInput
    data: XOR<room_registerUpdateWithoutPatient_infoInput, room_registerUncheckedUpdateWithoutPatient_infoInput>
  }

  export type room_registerUpdateManyWithWhereWithoutPatient_infoInput = {
    where: room_registerScalarWhereInput
    data: XOR<room_registerUpdateManyMutationInput, room_registerUncheckedUpdateManyWithoutPatient_infoInput>
  }

  export type patient_infoCreateWithoutPatient_uploadsInput = {
    patient_name: string
    registered_date: Date | string
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    bed_info?: bed_infoCreateNestedManyWithoutPatient_infoInput
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutPatient_infoInput
    room_register?: room_registerCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoUncheckedCreateWithoutPatient_uploadsInput = {
    patient_id?: number
    patient_name: string
    registered_date: Date | string
    center_id: number
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutPatient_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoCreateOrConnectWithoutPatient_uploadsInput = {
    where: patient_infoWhereUniqueInput
    create: XOR<patient_infoCreateWithoutPatient_uploadsInput, patient_infoUncheckedCreateWithoutPatient_uploadsInput>
  }

  export type patient_infoUpsertWithoutPatient_uploadsInput = {
    update: XOR<patient_infoUpdateWithoutPatient_uploadsInput, patient_infoUncheckedUpdateWithoutPatient_uploadsInput>
    create: XOR<patient_infoCreateWithoutPatient_uploadsInput, patient_infoUncheckedCreateWithoutPatient_uploadsInput>
    where?: patient_infoWhereInput
  }

  export type patient_infoUpdateToOneWithWhereWithoutPatient_uploadsInput = {
    where?: patient_infoWhereInput
    data: XOR<patient_infoUpdateWithoutPatient_uploadsInput, patient_infoUncheckedUpdateWithoutPatient_uploadsInput>
  }

  export type patient_infoUpdateWithoutPatient_uploadsInput = {
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUpdateManyWithoutPatient_infoNestedInput
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutPatient_infoNestedInput
    room_register?: room_registerUpdateManyWithoutPatient_infoNestedInput
  }

  export type patient_infoUncheckedUpdateWithoutPatient_uploadsInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    center_id?: IntFieldUpdateOperationsInput | number
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUncheckedUpdateManyWithoutPatient_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutPatient_infoNestedInput
  }

  export type bed_infoCreateWithoutRoom_infoInput = {
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    room_data?: room_dataCreateNestedManyWithoutBed_infoInput
    user_info?: user_infoCreateNestedOneWithoutBed_infoInput
    patient_info?: patient_infoCreateNestedOneWithoutBed_infoInput
  }

  export type bed_infoUncheckedCreateWithoutRoom_infoInput = {
    bed_id?: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: number | null
    assigned_nurse_id?: number | null
    room_data?: room_dataUncheckedCreateNestedManyWithoutBed_infoInput
  }

  export type bed_infoCreateOrConnectWithoutRoom_infoInput = {
    where: bed_infoWhereUniqueInput
    create: XOR<bed_infoCreateWithoutRoom_infoInput, bed_infoUncheckedCreateWithoutRoom_infoInput>
  }

  export type bed_infoCreateManyRoom_infoInputEnvelope = {
    data: bed_infoCreateManyRoom_infoInput | bed_infoCreateManyRoom_infoInput[]
    skipDuplicates?: boolean
  }

  export type medicalcenter_infoCreateWithoutRoom_infoInput = {
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoUncheckedCreateWithoutRoom_infoInput = {
    center_id?: number
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoCreateOrConnectWithoutRoom_infoInput = {
    where: medicalcenter_infoWhereUniqueInput
    create: XOR<medicalcenter_infoCreateWithoutRoom_infoInput, medicalcenter_infoUncheckedCreateWithoutRoom_infoInput>
  }

  export type room_registerCreateWithoutRoom_infoInput = {
    session_id: number
    reg_date: Date | string
    reg_time: Date | string
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutRoom_registerInput
    patient_info: patient_infoCreateNestedOneWithoutRoom_registerInput
  }

  export type room_registerUncheckedCreateWithoutRoom_infoInput = {
    patient_id: number
    session_id: number
    center_id: number
    reg_date: Date | string
    reg_time: Date | string
  }

  export type room_registerCreateOrConnectWithoutRoom_infoInput = {
    where: room_registerWhereUniqueInput
    create: XOR<room_registerCreateWithoutRoom_infoInput, room_registerUncheckedCreateWithoutRoom_infoInput>
  }

  export type room_registerCreateManyRoom_infoInputEnvelope = {
    data: room_registerCreateManyRoom_infoInput | room_registerCreateManyRoom_infoInput[]
    skipDuplicates?: boolean
  }

  export type bed_infoUpsertWithWhereUniqueWithoutRoom_infoInput = {
    where: bed_infoWhereUniqueInput
    update: XOR<bed_infoUpdateWithoutRoom_infoInput, bed_infoUncheckedUpdateWithoutRoom_infoInput>
    create: XOR<bed_infoCreateWithoutRoom_infoInput, bed_infoUncheckedCreateWithoutRoom_infoInput>
  }

  export type bed_infoUpdateWithWhereUniqueWithoutRoom_infoInput = {
    where: bed_infoWhereUniqueInput
    data: XOR<bed_infoUpdateWithoutRoom_infoInput, bed_infoUncheckedUpdateWithoutRoom_infoInput>
  }

  export type bed_infoUpdateManyWithWhereWithoutRoom_infoInput = {
    where: bed_infoScalarWhereInput
    data: XOR<bed_infoUpdateManyMutationInput, bed_infoUncheckedUpdateManyWithoutRoom_infoInput>
  }

  export type medicalcenter_infoUpsertWithoutRoom_infoInput = {
    update: XOR<medicalcenter_infoUpdateWithoutRoom_infoInput, medicalcenter_infoUncheckedUpdateWithoutRoom_infoInput>
    create: XOR<medicalcenter_infoCreateWithoutRoom_infoInput, medicalcenter_infoUncheckedCreateWithoutRoom_infoInput>
    where?: medicalcenter_infoWhereInput
  }

  export type medicalcenter_infoUpdateToOneWithWhereWithoutRoom_infoInput = {
    where?: medicalcenter_infoWhereInput
    data: XOR<medicalcenter_infoUpdateWithoutRoom_infoInput, medicalcenter_infoUncheckedUpdateWithoutRoom_infoInput>
  }

  export type medicalcenter_infoUpdateWithoutRoom_infoInput = {
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type medicalcenter_infoUncheckedUpdateWithoutRoom_infoInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type room_registerUpsertWithWhereUniqueWithoutRoom_infoInput = {
    where: room_registerWhereUniqueInput
    update: XOR<room_registerUpdateWithoutRoom_infoInput, room_registerUncheckedUpdateWithoutRoom_infoInput>
    create: XOR<room_registerCreateWithoutRoom_infoInput, room_registerUncheckedCreateWithoutRoom_infoInput>
  }

  export type room_registerUpdateWithWhereUniqueWithoutRoom_infoInput = {
    where: room_registerWhereUniqueInput
    data: XOR<room_registerUpdateWithoutRoom_infoInput, room_registerUncheckedUpdateWithoutRoom_infoInput>
  }

  export type room_registerUpdateManyWithWhereWithoutRoom_infoInput = {
    where: room_registerScalarWhereInput
    data: XOR<room_registerUpdateManyMutationInput, room_registerUncheckedUpdateManyWithoutRoom_infoInput>
  }

  export type room_dataCreateWithoutBed_infoInput = {
    audio_path: string
    patient_note: string
  }

  export type room_dataUncheckedCreateWithoutBed_infoInput = {
    id?: number
    audio_path: string
    patient_note: string
  }

  export type room_dataCreateOrConnectWithoutBed_infoInput = {
    where: room_dataWhereUniqueInput
    create: XOR<room_dataCreateWithoutBed_infoInput, room_dataUncheckedCreateWithoutBed_infoInput>
  }

  export type room_dataCreateManyBed_infoInputEnvelope = {
    data: room_dataCreateManyBed_infoInput | room_dataCreateManyBed_infoInput[]
    skipDuplicates?: boolean
  }

  export type user_infoCreateWithoutBed_infoInput = {
    user_name: string
    staff_id: string
    password: string
    user_role: string
    charter_id: string
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutUser_infoInput
    user_uploads?: user_uploadsCreateNestedManyWithoutUser_infoInput
  }

  export type user_infoUncheckedCreateWithoutBed_infoInput = {
    user_id?: number
    user_name: string
    staff_id: string
    password: string
    user_role: string
    center_id: number
    charter_id: string
    user_uploads?: user_uploadsUncheckedCreateNestedManyWithoutUser_infoInput
  }

  export type user_infoCreateOrConnectWithoutBed_infoInput = {
    where: user_infoWhereUniqueInput
    create: XOR<user_infoCreateWithoutBed_infoInput, user_infoUncheckedCreateWithoutBed_infoInput>
  }

  export type patient_infoCreateWithoutBed_infoInput = {
    patient_name: string
    registered_date: Date | string
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutPatient_infoInput
    patient_uploads?: patient_uploadsCreateNestedManyWithoutPatient_infoInput
    room_register?: room_registerCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoUncheckedCreateWithoutBed_infoInput = {
    patient_id?: number
    patient_name: string
    registered_date: Date | string
    center_id: number
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    patient_uploads?: patient_uploadsUncheckedCreateNestedManyWithoutPatient_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoCreateOrConnectWithoutBed_infoInput = {
    where: patient_infoWhereUniqueInput
    create: XOR<patient_infoCreateWithoutBed_infoInput, patient_infoUncheckedCreateWithoutBed_infoInput>
  }

  export type room_infoCreateWithoutBed_infoInput = {
    room_number: number
    number_of_beds: number
    is_full?: boolean
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutRoom_infoInput
    room_register?: room_registerCreateNestedManyWithoutRoom_infoInput
  }

  export type room_infoUncheckedCreateWithoutBed_infoInput = {
    room_id?: number
    room_number: number
    center_id: number
    number_of_beds: number
    is_full?: boolean
    room_register?: room_registerUncheckedCreateNestedManyWithoutRoom_infoInput
  }

  export type room_infoCreateOrConnectWithoutBed_infoInput = {
    where: room_infoWhereUniqueInput
    create: XOR<room_infoCreateWithoutBed_infoInput, room_infoUncheckedCreateWithoutBed_infoInput>
  }

  export type room_dataUpsertWithWhereUniqueWithoutBed_infoInput = {
    where: room_dataWhereUniqueInput
    update: XOR<room_dataUpdateWithoutBed_infoInput, room_dataUncheckedUpdateWithoutBed_infoInput>
    create: XOR<room_dataCreateWithoutBed_infoInput, room_dataUncheckedCreateWithoutBed_infoInput>
  }

  export type room_dataUpdateWithWhereUniqueWithoutBed_infoInput = {
    where: room_dataWhereUniqueInput
    data: XOR<room_dataUpdateWithoutBed_infoInput, room_dataUncheckedUpdateWithoutBed_infoInput>
  }

  export type room_dataUpdateManyWithWhereWithoutBed_infoInput = {
    where: room_dataScalarWhereInput
    data: XOR<room_dataUpdateManyMutationInput, room_dataUncheckedUpdateManyWithoutBed_infoInput>
  }

  export type room_dataScalarWhereInput = {
    AND?: room_dataScalarWhereInput | room_dataScalarWhereInput[]
    OR?: room_dataScalarWhereInput[]
    NOT?: room_dataScalarWhereInput | room_dataScalarWhereInput[]
    id?: IntFilter<"room_data"> | number
    bed_id?: IntFilter<"room_data"> | number
    audio_path?: StringFilter<"room_data"> | string
    patient_note?: StringFilter<"room_data"> | string
  }

  export type user_infoUpsertWithoutBed_infoInput = {
    update: XOR<user_infoUpdateWithoutBed_infoInput, user_infoUncheckedUpdateWithoutBed_infoInput>
    create: XOR<user_infoCreateWithoutBed_infoInput, user_infoUncheckedCreateWithoutBed_infoInput>
    where?: user_infoWhereInput
  }

  export type user_infoUpdateToOneWithWhereWithoutBed_infoInput = {
    where?: user_infoWhereInput
    data: XOR<user_infoUpdateWithoutBed_infoInput, user_infoUncheckedUpdateWithoutBed_infoInput>
  }

  export type user_infoUpdateWithoutBed_infoInput = {
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    charter_id?: StringFieldUpdateOperationsInput | string
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutUser_infoNestedInput
    user_uploads?: user_uploadsUpdateManyWithoutUser_infoNestedInput
  }

  export type user_infoUncheckedUpdateWithoutBed_infoInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    center_id?: IntFieldUpdateOperationsInput | number
    charter_id?: StringFieldUpdateOperationsInput | string
    user_uploads?: user_uploadsUncheckedUpdateManyWithoutUser_infoNestedInput
  }

  export type patient_infoUpsertWithoutBed_infoInput = {
    update: XOR<patient_infoUpdateWithoutBed_infoInput, patient_infoUncheckedUpdateWithoutBed_infoInput>
    create: XOR<patient_infoCreateWithoutBed_infoInput, patient_infoUncheckedCreateWithoutBed_infoInput>
    where?: patient_infoWhereInput
  }

  export type patient_infoUpdateToOneWithWhereWithoutBed_infoInput = {
    where?: patient_infoWhereInput
    data: XOR<patient_infoUpdateWithoutBed_infoInput, patient_infoUncheckedUpdateWithoutBed_infoInput>
  }

  export type patient_infoUpdateWithoutBed_infoInput = {
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutPatient_infoNestedInput
    patient_uploads?: patient_uploadsUpdateManyWithoutPatient_infoNestedInput
    room_register?: room_registerUpdateManyWithoutPatient_infoNestedInput
  }

  export type patient_infoUncheckedUpdateWithoutBed_infoInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    center_id?: IntFieldUpdateOperationsInput | number
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    patient_uploads?: patient_uploadsUncheckedUpdateManyWithoutPatient_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutPatient_infoNestedInput
  }

  export type room_infoUpsertWithoutBed_infoInput = {
    update: XOR<room_infoUpdateWithoutBed_infoInput, room_infoUncheckedUpdateWithoutBed_infoInput>
    create: XOR<room_infoCreateWithoutBed_infoInput, room_infoUncheckedCreateWithoutBed_infoInput>
    where?: room_infoWhereInput
  }

  export type room_infoUpdateToOneWithWhereWithoutBed_infoInput = {
    where?: room_infoWhereInput
    data: XOR<room_infoUpdateWithoutBed_infoInput, room_infoUncheckedUpdateWithoutBed_infoInput>
  }

  export type room_infoUpdateWithoutBed_infoInput = {
    room_number?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutRoom_infoNestedInput
    room_register?: room_registerUpdateManyWithoutRoom_infoNestedInput
  }

  export type room_infoUncheckedUpdateWithoutBed_infoInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_number?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
    room_register?: room_registerUncheckedUpdateManyWithoutRoom_infoNestedInput
  }

  export type bed_infoCreateWithoutRoom_dataInput = {
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    user_info?: user_infoCreateNestedOneWithoutBed_infoInput
    patient_info?: patient_infoCreateNestedOneWithoutBed_infoInput
    room_info: room_infoCreateNestedOneWithoutBed_infoInput
  }

  export type bed_infoUncheckedCreateWithoutRoom_dataInput = {
    bed_id?: number
    room_id: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: number | null
    assigned_nurse_id?: number | null
  }

  export type bed_infoCreateOrConnectWithoutRoom_dataInput = {
    where: bed_infoWhereUniqueInput
    create: XOR<bed_infoCreateWithoutRoom_dataInput, bed_infoUncheckedCreateWithoutRoom_dataInput>
  }

  export type bed_infoUpsertWithoutRoom_dataInput = {
    update: XOR<bed_infoUpdateWithoutRoom_dataInput, bed_infoUncheckedUpdateWithoutRoom_dataInput>
    create: XOR<bed_infoCreateWithoutRoom_dataInput, bed_infoUncheckedCreateWithoutRoom_dataInput>
    where?: bed_infoWhereInput
  }

  export type bed_infoUpdateToOneWithWhereWithoutRoom_dataInput = {
    where?: bed_infoWhereInput
    data: XOR<bed_infoUpdateWithoutRoom_dataInput, bed_infoUncheckedUpdateWithoutRoom_dataInput>
  }

  export type bed_infoUpdateWithoutRoom_dataInput = {
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    user_info?: user_infoUpdateOneWithoutBed_infoNestedInput
    patient_info?: patient_infoUpdateOneWithoutBed_infoNestedInput
    room_info?: room_infoUpdateOneRequiredWithoutBed_infoNestedInput
  }

  export type bed_infoUncheckedUpdateWithoutRoom_dataInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_patient_id?: NullableIntFieldUpdateOperationsInput | number | null
    assigned_nurse_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type medicalcenter_infoCreateWithoutRoom_registerInput = {
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_info?: room_infoCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoUncheckedCreateWithoutRoom_registerInput = {
    center_id?: number
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_info?: room_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoCreateOrConnectWithoutRoom_registerInput = {
    where: medicalcenter_infoWhereUniqueInput
    create: XOR<medicalcenter_infoCreateWithoutRoom_registerInput, medicalcenter_infoUncheckedCreateWithoutRoom_registerInput>
  }

  export type patient_infoCreateWithoutRoom_registerInput = {
    patient_name: string
    registered_date: Date | string
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    bed_info?: bed_infoCreateNestedManyWithoutPatient_infoInput
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutPatient_infoInput
    patient_uploads?: patient_uploadsCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoUncheckedCreateWithoutRoom_registerInput = {
    patient_id?: number
    patient_name: string
    registered_date: Date | string
    center_id: number
    dicharged_date?: Date | string | null
    is_discharged?: boolean
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutPatient_infoInput
    patient_uploads?: patient_uploadsUncheckedCreateNestedManyWithoutPatient_infoInput
  }

  export type patient_infoCreateOrConnectWithoutRoom_registerInput = {
    where: patient_infoWhereUniqueInput
    create: XOR<patient_infoCreateWithoutRoom_registerInput, patient_infoUncheckedCreateWithoutRoom_registerInput>
  }

  export type room_infoCreateWithoutRoom_registerInput = {
    room_number: number
    number_of_beds: number
    is_full?: boolean
    bed_info?: bed_infoCreateNestedManyWithoutRoom_infoInput
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutRoom_infoInput
  }

  export type room_infoUncheckedCreateWithoutRoom_registerInput = {
    room_id?: number
    room_number: number
    center_id: number
    number_of_beds: number
    is_full?: boolean
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutRoom_infoInput
  }

  export type room_infoCreateOrConnectWithoutRoom_registerInput = {
    where: room_infoWhereUniqueInput
    create: XOR<room_infoCreateWithoutRoom_registerInput, room_infoUncheckedCreateWithoutRoom_registerInput>
  }

  export type medicalcenter_infoUpsertWithoutRoom_registerInput = {
    update: XOR<medicalcenter_infoUpdateWithoutRoom_registerInput, medicalcenter_infoUncheckedUpdateWithoutRoom_registerInput>
    create: XOR<medicalcenter_infoCreateWithoutRoom_registerInput, medicalcenter_infoUncheckedCreateWithoutRoom_registerInput>
    where?: medicalcenter_infoWhereInput
  }

  export type medicalcenter_infoUpdateToOneWithWhereWithoutRoom_registerInput = {
    where?: medicalcenter_infoWhereInput
    data: XOR<medicalcenter_infoUpdateWithoutRoom_registerInput, medicalcenter_infoUncheckedUpdateWithoutRoom_registerInput>
  }

  export type medicalcenter_infoUpdateWithoutRoom_registerInput = {
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_info?: room_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type medicalcenter_infoUncheckedUpdateWithoutRoom_registerInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_info?: room_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type patient_infoUpsertWithoutRoom_registerInput = {
    update: XOR<patient_infoUpdateWithoutRoom_registerInput, patient_infoUncheckedUpdateWithoutRoom_registerInput>
    create: XOR<patient_infoCreateWithoutRoom_registerInput, patient_infoUncheckedCreateWithoutRoom_registerInput>
    where?: patient_infoWhereInput
  }

  export type patient_infoUpdateToOneWithWhereWithoutRoom_registerInput = {
    where?: patient_infoWhereInput
    data: XOR<patient_infoUpdateWithoutRoom_registerInput, patient_infoUncheckedUpdateWithoutRoom_registerInput>
  }

  export type patient_infoUpdateWithoutRoom_registerInput = {
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUpdateManyWithoutPatient_infoNestedInput
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutPatient_infoNestedInput
    patient_uploads?: patient_uploadsUpdateManyWithoutPatient_infoNestedInput
  }

  export type patient_infoUncheckedUpdateWithoutRoom_registerInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    center_id?: IntFieldUpdateOperationsInput | number
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUncheckedUpdateManyWithoutPatient_infoNestedInput
    patient_uploads?: patient_uploadsUncheckedUpdateManyWithoutPatient_infoNestedInput
  }

  export type room_infoUpsertWithoutRoom_registerInput = {
    update: XOR<room_infoUpdateWithoutRoom_registerInput, room_infoUncheckedUpdateWithoutRoom_registerInput>
    create: XOR<room_infoCreateWithoutRoom_registerInput, room_infoUncheckedCreateWithoutRoom_registerInput>
    where?: room_infoWhereInput
  }

  export type room_infoUpdateToOneWithWhereWithoutRoom_registerInput = {
    where?: room_infoWhereInput
    data: XOR<room_infoUpdateWithoutRoom_registerInput, room_infoUncheckedUpdateWithoutRoom_registerInput>
  }

  export type room_infoUpdateWithoutRoom_registerInput = {
    room_number?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUpdateManyWithoutRoom_infoNestedInput
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutRoom_infoNestedInput
  }

  export type room_infoUncheckedUpdateWithoutRoom_registerInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_number?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUncheckedUpdateManyWithoutRoom_infoNestedInput
  }

  export type bed_infoCreateWithoutUser_infoInput = {
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    room_data?: room_dataCreateNestedManyWithoutBed_infoInput
    patient_info?: patient_infoCreateNestedOneWithoutBed_infoInput
    room_info: room_infoCreateNestedOneWithoutBed_infoInput
  }

  export type bed_infoUncheckedCreateWithoutUser_infoInput = {
    bed_id?: number
    room_id: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: number | null
    room_data?: room_dataUncheckedCreateNestedManyWithoutBed_infoInput
  }

  export type bed_infoCreateOrConnectWithoutUser_infoInput = {
    where: bed_infoWhereUniqueInput
    create: XOR<bed_infoCreateWithoutUser_infoInput, bed_infoUncheckedCreateWithoutUser_infoInput>
  }

  export type bed_infoCreateManyUser_infoInputEnvelope = {
    data: bed_infoCreateManyUser_infoInput | bed_infoCreateManyUser_infoInput[]
    skipDuplicates?: boolean
  }

  export type medicalcenter_infoCreateWithoutUser_infoInput = {
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_info?: room_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoUncheckedCreateWithoutUser_infoInput = {
    center_id?: number
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_info?: room_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_uploads?: user_uploadsUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoCreateOrConnectWithoutUser_infoInput = {
    where: medicalcenter_infoWhereUniqueInput
    create: XOR<medicalcenter_infoCreateWithoutUser_infoInput, medicalcenter_infoUncheckedCreateWithoutUser_infoInput>
  }

  export type user_uploadsCreateWithoutUser_infoInput = {
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutUser_uploadsInput
  }

  export type user_uploadsUncheckedCreateWithoutUser_infoInput = {
    center_id: number
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
  }

  export type user_uploadsCreateOrConnectWithoutUser_infoInput = {
    where: user_uploadsWhereUniqueInput
    create: XOR<user_uploadsCreateWithoutUser_infoInput, user_uploadsUncheckedCreateWithoutUser_infoInput>
  }

  export type user_uploadsCreateManyUser_infoInputEnvelope = {
    data: user_uploadsCreateManyUser_infoInput | user_uploadsCreateManyUser_infoInput[]
    skipDuplicates?: boolean
  }

  export type bed_infoUpsertWithWhereUniqueWithoutUser_infoInput = {
    where: bed_infoWhereUniqueInput
    update: XOR<bed_infoUpdateWithoutUser_infoInput, bed_infoUncheckedUpdateWithoutUser_infoInput>
    create: XOR<bed_infoCreateWithoutUser_infoInput, bed_infoUncheckedCreateWithoutUser_infoInput>
  }

  export type bed_infoUpdateWithWhereUniqueWithoutUser_infoInput = {
    where: bed_infoWhereUniqueInput
    data: XOR<bed_infoUpdateWithoutUser_infoInput, bed_infoUncheckedUpdateWithoutUser_infoInput>
  }

  export type bed_infoUpdateManyWithWhereWithoutUser_infoInput = {
    where: bed_infoScalarWhereInput
    data: XOR<bed_infoUpdateManyMutationInput, bed_infoUncheckedUpdateManyWithoutUser_infoInput>
  }

  export type medicalcenter_infoUpsertWithoutUser_infoInput = {
    update: XOR<medicalcenter_infoUpdateWithoutUser_infoInput, medicalcenter_infoUncheckedUpdateWithoutUser_infoInput>
    create: XOR<medicalcenter_infoCreateWithoutUser_infoInput, medicalcenter_infoUncheckedCreateWithoutUser_infoInput>
    where?: medicalcenter_infoWhereInput
  }

  export type medicalcenter_infoUpdateToOneWithWhereWithoutUser_infoInput = {
    where?: medicalcenter_infoWhereInput
    data: XOR<medicalcenter_infoUpdateWithoutUser_infoInput, medicalcenter_infoUncheckedUpdateWithoutUser_infoInput>
  }

  export type medicalcenter_infoUpdateWithoutUser_infoInput = {
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_info?: room_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type medicalcenter_infoUncheckedUpdateWithoutUser_infoInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_info?: room_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_uploads?: user_uploadsUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type user_uploadsUpsertWithWhereUniqueWithoutUser_infoInput = {
    where: user_uploadsWhereUniqueInput
    update: XOR<user_uploadsUpdateWithoutUser_infoInput, user_uploadsUncheckedUpdateWithoutUser_infoInput>
    create: XOR<user_uploadsCreateWithoutUser_infoInput, user_uploadsUncheckedCreateWithoutUser_infoInput>
  }

  export type user_uploadsUpdateWithWhereUniqueWithoutUser_infoInput = {
    where: user_uploadsWhereUniqueInput
    data: XOR<user_uploadsUpdateWithoutUser_infoInput, user_uploadsUncheckedUpdateWithoutUser_infoInput>
  }

  export type user_uploadsUpdateManyWithWhereWithoutUser_infoInput = {
    where: user_uploadsScalarWhereInput
    data: XOR<user_uploadsUpdateManyMutationInput, user_uploadsUncheckedUpdateManyWithoutUser_infoInput>
  }

  export type medicalcenter_infoCreateWithoutUser_uploadsInput = {
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_info?: room_infoCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoUncheckedCreateWithoutUser_uploadsInput = {
    center_id?: number
    center_name: string
    address?: string | null
    email?: string | null
    patient_info?: patient_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_info?: room_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    room_register?: room_registerUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
    user_info?: user_infoUncheckedCreateNestedManyWithoutMedicalcenter_infoInput
  }

  export type medicalcenter_infoCreateOrConnectWithoutUser_uploadsInput = {
    where: medicalcenter_infoWhereUniqueInput
    create: XOR<medicalcenter_infoCreateWithoutUser_uploadsInput, medicalcenter_infoUncheckedCreateWithoutUser_uploadsInput>
  }

  export type user_infoCreateWithoutUser_uploadsInput = {
    user_name: string
    staff_id: string
    password: string
    user_role: string
    charter_id: string
    bed_info?: bed_infoCreateNestedManyWithoutUser_infoInput
    medicalcenter_info: medicalcenter_infoCreateNestedOneWithoutUser_infoInput
  }

  export type user_infoUncheckedCreateWithoutUser_uploadsInput = {
    user_id?: number
    user_name: string
    staff_id: string
    password: string
    user_role: string
    center_id: number
    charter_id: string
    bed_info?: bed_infoUncheckedCreateNestedManyWithoutUser_infoInput
  }

  export type user_infoCreateOrConnectWithoutUser_uploadsInput = {
    where: user_infoWhereUniqueInput
    create: XOR<user_infoCreateWithoutUser_uploadsInput, user_infoUncheckedCreateWithoutUser_uploadsInput>
  }

  export type medicalcenter_infoUpsertWithoutUser_uploadsInput = {
    update: XOR<medicalcenter_infoUpdateWithoutUser_uploadsInput, medicalcenter_infoUncheckedUpdateWithoutUser_uploadsInput>
    create: XOR<medicalcenter_infoCreateWithoutUser_uploadsInput, medicalcenter_infoUncheckedCreateWithoutUser_uploadsInput>
    where?: medicalcenter_infoWhereInput
  }

  export type medicalcenter_infoUpdateToOneWithWhereWithoutUser_uploadsInput = {
    where?: medicalcenter_infoWhereInput
    data: XOR<medicalcenter_infoUpdateWithoutUser_uploadsInput, medicalcenter_infoUncheckedUpdateWithoutUser_uploadsInput>
  }

  export type medicalcenter_infoUpdateWithoutUser_uploadsInput = {
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_info?: room_infoUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type medicalcenter_infoUncheckedUpdateWithoutUser_uploadsInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    center_name?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    email?: NullableStringFieldUpdateOperationsInput | string | null
    patient_info?: patient_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_info?: room_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
    user_info?: user_infoUncheckedUpdateManyWithoutMedicalcenter_infoNestedInput
  }

  export type user_infoUpsertWithoutUser_uploadsInput = {
    update: XOR<user_infoUpdateWithoutUser_uploadsInput, user_infoUncheckedUpdateWithoutUser_uploadsInput>
    create: XOR<user_infoCreateWithoutUser_uploadsInput, user_infoUncheckedCreateWithoutUser_uploadsInput>
    where?: user_infoWhereInput
  }

  export type user_infoUpdateToOneWithWhereWithoutUser_uploadsInput = {
    where?: user_infoWhereInput
    data: XOR<user_infoUpdateWithoutUser_uploadsInput, user_infoUncheckedUpdateWithoutUser_uploadsInput>
  }

  export type user_infoUpdateWithoutUser_uploadsInput = {
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    charter_id?: StringFieldUpdateOperationsInput | string
    bed_info?: bed_infoUpdateManyWithoutUser_infoNestedInput
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutUser_infoNestedInput
  }

  export type user_infoUncheckedUpdateWithoutUser_uploadsInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    center_id?: IntFieldUpdateOperationsInput | number
    charter_id?: StringFieldUpdateOperationsInput | string
    bed_info?: bed_infoUncheckedUpdateManyWithoutUser_infoNestedInput
  }

  export type patient_infoCreateManyMedicalcenter_infoInput = {
    patient_id?: number
    patient_name: string
    registered_date: Date | string
    dicharged_date?: Date | string | null
    is_discharged?: boolean
  }

  export type room_infoCreateManyMedicalcenter_infoInput = {
    room_id?: number
    room_number: number
    number_of_beds: number
    is_full?: boolean
  }

  export type room_registerCreateManyMedicalcenter_infoInput = {
    room_id: number
    patient_id: number
    session_id: number
    reg_date: Date | string
    reg_time: Date | string
  }

  export type user_infoCreateManyMedicalcenter_infoInput = {
    user_id?: number
    user_name: string
    staff_id: string
    password: string
    user_role: string
    charter_id: string
  }

  export type user_uploadsCreateManyMedicalcenter_infoInput = {
    user_id: number
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
  }

  export type patient_infoUpdateWithoutMedicalcenter_infoInput = {
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUpdateManyWithoutPatient_infoNestedInput
    patient_uploads?: patient_uploadsUpdateManyWithoutPatient_infoNestedInput
    room_register?: room_registerUpdateManyWithoutPatient_infoNestedInput
  }

  export type patient_infoUncheckedUpdateWithoutMedicalcenter_infoInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUncheckedUpdateManyWithoutPatient_infoNestedInput
    patient_uploads?: patient_uploadsUncheckedUpdateManyWithoutPatient_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutPatient_infoNestedInput
  }

  export type patient_infoUncheckedUpdateManyWithoutMedicalcenter_infoInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    patient_name?: StringFieldUpdateOperationsInput | string
    registered_date?: DateTimeFieldUpdateOperationsInput | Date | string
    dicharged_date?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_discharged?: BoolFieldUpdateOperationsInput | boolean
  }

  export type room_infoUpdateWithoutMedicalcenter_infoInput = {
    room_number?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUpdateManyWithoutRoom_infoNestedInput
    room_register?: room_registerUpdateManyWithoutRoom_infoNestedInput
  }

  export type room_infoUncheckedUpdateWithoutMedicalcenter_infoInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_number?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
    bed_info?: bed_infoUncheckedUpdateManyWithoutRoom_infoNestedInput
    room_register?: room_registerUncheckedUpdateManyWithoutRoom_infoNestedInput
  }

  export type room_infoUncheckedUpdateManyWithoutMedicalcenter_infoInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    room_number?: IntFieldUpdateOperationsInput | number
    number_of_beds?: IntFieldUpdateOperationsInput | number
    is_full?: BoolFieldUpdateOperationsInput | boolean
  }

  export type room_registerUpdateWithoutMedicalcenter_infoInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
    patient_info?: patient_infoUpdateOneRequiredWithoutRoom_registerNestedInput
    room_info?: room_infoUpdateOneRequiredWithoutRoom_registerNestedInput
  }

  export type room_registerUncheckedUpdateWithoutMedicalcenter_infoInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_registerUncheckedUpdateManyWithoutMedicalcenter_infoInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    patient_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_infoUpdateWithoutMedicalcenter_infoInput = {
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    charter_id?: StringFieldUpdateOperationsInput | string
    bed_info?: bed_infoUpdateManyWithoutUser_infoNestedInput
    user_uploads?: user_uploadsUpdateManyWithoutUser_infoNestedInput
  }

  export type user_infoUncheckedUpdateWithoutMedicalcenter_infoInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    charter_id?: StringFieldUpdateOperationsInput | string
    bed_info?: bed_infoUncheckedUpdateManyWithoutUser_infoNestedInput
    user_uploads?: user_uploadsUncheckedUpdateManyWithoutUser_infoNestedInput
  }

  export type user_infoUncheckedUpdateManyWithoutMedicalcenter_infoInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    user_name?: StringFieldUpdateOperationsInput | string
    staff_id?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    user_role?: StringFieldUpdateOperationsInput | string
    charter_id?: StringFieldUpdateOperationsInput | string
  }

  export type user_uploadsUpdateWithoutMedicalcenter_infoInput = {
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
    user_info?: user_infoUpdateOneRequiredWithoutUser_uploadsNestedInput
  }

  export type user_uploadsUncheckedUpdateWithoutMedicalcenter_infoInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_uploadsUncheckedUpdateManyWithoutMedicalcenter_infoInput = {
    user_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bed_infoCreateManyPatient_infoInput = {
    bed_id?: number
    room_id: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_nurse_id?: number | null
  }

  export type patient_uploadsCreateManyPatient_infoInput = {
    session_id: number
    upload_path: string
    patient_notes: string
    upload_time: Date | string
  }

  export type room_registerCreateManyPatient_infoInput = {
    room_id: number
    session_id: number
    center_id: number
    reg_date: Date | string
    reg_time: Date | string
  }

  export type bed_infoUpdateWithoutPatient_infoInput = {
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    room_data?: room_dataUpdateManyWithoutBed_infoNestedInput
    user_info?: user_infoUpdateOneWithoutBed_infoNestedInput
    room_info?: room_infoUpdateOneRequiredWithoutBed_infoNestedInput
  }

  export type bed_infoUncheckedUpdateWithoutPatient_infoInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_nurse_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_data?: room_dataUncheckedUpdateManyWithoutBed_infoNestedInput
  }

  export type bed_infoUncheckedUpdateManyWithoutPatient_infoInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_nurse_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type patient_uploadsUpdateWithoutPatient_infoInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    patient_notes?: StringFieldUpdateOperationsInput | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type patient_uploadsUncheckedUpdateWithoutPatient_infoInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    patient_notes?: StringFieldUpdateOperationsInput | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type patient_uploadsUncheckedUpdateManyWithoutPatient_infoInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    patient_notes?: StringFieldUpdateOperationsInput | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_registerUpdateWithoutPatient_infoInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutRoom_registerNestedInput
    room_info?: room_infoUpdateOneRequiredWithoutRoom_registerNestedInput
  }

  export type room_registerUncheckedUpdateWithoutPatient_infoInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_registerUncheckedUpdateManyWithoutPatient_infoInput = {
    room_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type bed_infoCreateManyRoom_infoInput = {
    bed_id?: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: number | null
    assigned_nurse_id?: number | null
  }

  export type room_registerCreateManyRoom_infoInput = {
    patient_id: number
    session_id: number
    center_id: number
    reg_date: Date | string
    reg_time: Date | string
  }

  export type bed_infoUpdateWithoutRoom_infoInput = {
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    room_data?: room_dataUpdateManyWithoutBed_infoNestedInput
    user_info?: user_infoUpdateOneWithoutBed_infoNestedInput
    patient_info?: patient_infoUpdateOneWithoutBed_infoNestedInput
  }

  export type bed_infoUncheckedUpdateWithoutRoom_infoInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_patient_id?: NullableIntFieldUpdateOperationsInput | number | null
    assigned_nurse_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_data?: room_dataUncheckedUpdateManyWithoutBed_infoNestedInput
  }

  export type bed_infoUncheckedUpdateManyWithoutRoom_infoInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_patient_id?: NullableIntFieldUpdateOperationsInput | number | null
    assigned_nurse_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type room_registerUpdateWithoutRoom_infoInput = {
    session_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutRoom_registerNestedInput
    patient_info?: patient_infoUpdateOneRequiredWithoutRoom_registerNestedInput
  }

  export type room_registerUncheckedUpdateWithoutRoom_infoInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_registerUncheckedUpdateManyWithoutRoom_infoInput = {
    patient_id?: IntFieldUpdateOperationsInput | number
    session_id?: IntFieldUpdateOperationsInput | number
    center_id?: IntFieldUpdateOperationsInput | number
    reg_date?: DateTimeFieldUpdateOperationsInput | Date | string
    reg_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type room_dataCreateManyBed_infoInput = {
    id?: number
    audio_path: string
    patient_note: string
  }

  export type room_dataUpdateWithoutBed_infoInput = {
    audio_path?: StringFieldUpdateOperationsInput | string
    patient_note?: StringFieldUpdateOperationsInput | string
  }

  export type room_dataUncheckedUpdateWithoutBed_infoInput = {
    id?: IntFieldUpdateOperationsInput | number
    audio_path?: StringFieldUpdateOperationsInput | string
    patient_note?: StringFieldUpdateOperationsInput | string
  }

  export type room_dataUncheckedUpdateManyWithoutBed_infoInput = {
    id?: IntFieldUpdateOperationsInput | number
    audio_path?: StringFieldUpdateOperationsInput | string
    patient_note?: StringFieldUpdateOperationsInput | string
  }

  export type bed_infoCreateManyUser_infoInput = {
    bed_id?: number
    room_id: number
    bed_letter: string
    is_available?: boolean
    is_assigned?: boolean
    assigned_patient_id?: number | null
  }

  export type user_uploadsCreateManyUser_infoInput = {
    center_id: number
    upload_path: string
    unassigned_uploads: string
    upload_date: Date | string
    upload_time: Date | string
  }

  export type bed_infoUpdateWithoutUser_infoInput = {
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    room_data?: room_dataUpdateManyWithoutBed_infoNestedInput
    patient_info?: patient_infoUpdateOneWithoutBed_infoNestedInput
    room_info?: room_infoUpdateOneRequiredWithoutBed_infoNestedInput
  }

  export type bed_infoUncheckedUpdateWithoutUser_infoInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_patient_id?: NullableIntFieldUpdateOperationsInput | number | null
    room_data?: room_dataUncheckedUpdateManyWithoutBed_infoNestedInput
  }

  export type bed_infoUncheckedUpdateManyWithoutUser_infoInput = {
    bed_id?: IntFieldUpdateOperationsInput | number
    room_id?: IntFieldUpdateOperationsInput | number
    bed_letter?: StringFieldUpdateOperationsInput | string
    is_available?: BoolFieldUpdateOperationsInput | boolean
    is_assigned?: BoolFieldUpdateOperationsInput | boolean
    assigned_patient_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type user_uploadsUpdateWithoutUser_infoInput = {
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
    medicalcenter_info?: medicalcenter_infoUpdateOneRequiredWithoutUser_uploadsNestedInput
  }

  export type user_uploadsUncheckedUpdateWithoutUser_infoInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type user_uploadsUncheckedUpdateManyWithoutUser_infoInput = {
    center_id?: IntFieldUpdateOperationsInput | number
    upload_path?: StringFieldUpdateOperationsInput | string
    unassigned_uploads?: StringFieldUpdateOperationsInput | string
    upload_date?: DateTimeFieldUpdateOperationsInput | Date | string
    upload_time?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}