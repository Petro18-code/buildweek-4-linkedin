import ProfileList from './ProfileList'; 
import './SideBar.css';

const Sidebar = ({ currentUserId }) => {
  return (
    <aside className="sidebar">
      <div className="profile-list-container">
        <ProfileList excludeUserId={currentUserId} />
      </div>
    </aside>
  );
};

export default Sidebar;
