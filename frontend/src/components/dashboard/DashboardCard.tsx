interface DashboardCardProps {
    title: string;
    value: string | number;
  }
  
  const DashboardCard = ({ title, value }: DashboardCardProps) => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
    </div>
  );
  
  export default DashboardCard;
  