using System.Data.Entity;

namespace HMS.DAL
{
    public static class DBUtils
    {
        public static void Clear<T>(this DbSet<T> dbSet) where T : class
        {
            dbSet.RemoveRange(dbSet);
        }
    }
}
