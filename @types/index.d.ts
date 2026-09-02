/** biome-ignore-all lint/correctness/noUnusedVariables: false positive */
type TUserType = "lender" | "borrower" | null

interface IApiResponse<T> {
  success: boolean
  message: string
  data: T
}

interface IUser {
  id: string
  email: string
  password: string
  fullName: string
  phoneNumber: string
  residentialAddress: string
  isVerified: boolean
  userType: TUserType
  isEmailVerified: boolean
  isOnboardingComplete: boolean
  twoFactorSecret: string | null
  createdAt: string
  updatedAt: string
  borrowerProfile: IBorrowerProfile | null
}

interface IMetrics {
  totalUsers: number
  activeUsers: number
  totalTransactions: number
  transactionVolume: number
  totalWalletBalance: number
  pendingTransactions: number
}

interface ITransaction {
  id: string
  userId: string
  transactionType: string
  productLine: string
  status: string
  amount: string
  currency: string
  referenceId: string
  merchantId: string | null
  purposeCode: string | null
  description: string
  metadata: {
    phoneNumber: string
    operatorId: string
    pagaTransactionId: string
  }
  initiatedBy: string | null
  approvedBy: string | null
  completedAt: string
  failureReason: string | null
  createdAt: string
  updatedAt: string
  user: IUser
}

type TTransactionType = "EXTERNAL_FUND" | "WITHDRAWAL" | "TRANSFER" | "PAYMENT" | "REFUND"
type TTransactionStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" | "CANCELLED"
type TProductLine = "CASH" | "CREDIT" | "SAVINGS" | "INVESTMENT"
type TPocketType = "CASH_MAIN" | "CASH_RESERVE" | "CREDIT_MAIN" | "SAVINGS_MAIN"
type TEntryType = "DEBIT" | "CREDIT"
type TPaymentMethod = "BANK_TRANSFER" | "CARD" | "WALLET" | "USSD"
type TValidator = "SYSTEM" | "ADMIN" | "AUTO"
type TCurrency = "NGN" | "USD" | "GBP" | "EUR"

interface IPayerDetails {
  paymentReferenceNumber: string
  narration: string
  paymentMethod: TPaymentMethod
  payerName: string
  payerBankName: string
  payerBankAccountNumber: string
}

interface IWebhookData {
  statusCode: string
  statusMessage: string
  transactionReference: string
  fundingTransactionReference: string
  fundingPaymentReference: string
  accountNumber: string
  accountName: string
  financialIdentificationNumber: string | null
  amount: string
  clearingFeeAmount: string
  payerDetails: IPayerDetails
  narration: string
  hash: string
  transactionDate: string
}

interface ITransactionMetadata {
  source?: string
  accountNumber?: string
  accountName?: string
  phoneNumber?: string
  operatorId?: string
  pagaTransactionId?: string
  payerDetails?: IPayerDetails
  webhookData?: IWebhookData
  [key: string]: unknown
}

interface ILedgerEntry {
  id: string
  walletId: string
  pocketType: TPocketType
  entryType: TEntryType
  amount: number
  balanceBefore: number
  balanceAfter: number
}

interface ILogSnapshotTransaction {
  id: string
  type: TTransactionType
  amount: number
  status: TTransactionStatus
}

interface ILogSnapshot {
  transaction: ILogSnapshotTransaction
  entries: ILedgerEntry[]
  timestamp: string
}

interface ILogTransaction {
  id: string
  userId: string
  transactionType: TTransactionType
  productLine: TProductLine
  status: TTransactionStatus
  amount: string
  currency: TCurrency
  referenceId: string
  merchantId: string | null
  purposeCode: string | null
  description: string
  metadata: ITransactionMetadata
  initiatedBy: string
  approvedBy: string | null
  completedAt: string | null
  failureReason: string | null
  createdAt: string
  updatedAt: string
}

interface ILog {
  id: string
  transactionId: string
  dataHash: string
  previousHash: string
  validator: TValidator
  snapshot: ILogSnapshot
  isVerified: boolean
  createdAt: string
  createdBy: string | null
  transaction: ILogTransaction
}
