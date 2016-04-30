namespace DAL.Entities
{
    public class EntityBase
    {
        public EntityBase()
        {
            Active = true;
        }
        public long Id { get; set; }
        public bool? Active { get; set; }
    }
}
