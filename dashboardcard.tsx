import "./DashboardCard.css";

interface DashboardCardProps {
  title: string;
  value: number;
  color: string;
}

const DashboardCard = ({
  title,
  value,
  color,
}: DashboardCardProps) => {
  return (
    <div className={`dashboard-card ${color}`}>
      <h2 className="dashboard-card-title">{title}</h2>

      <p className="dashboard-card-value">{value}</p>
    </div>
  );
};

export default DashboardCard;