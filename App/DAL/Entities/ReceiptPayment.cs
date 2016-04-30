namespace DAL.Entities
{
    public partial class ReceiptPayment : EntityBase
    {
        public long PaymentId { get; set; }
        public long ItemId { get; set; }
        public int Quantity { get; set; }
        public decimal SalePrice { get; set; }
    
        public virtual Item Item { get; set; }
        public virtual Payment Payment { get; set; }
    }
}
