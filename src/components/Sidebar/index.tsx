import { useRef, useState } from "react";
import "./styles.css";

const menuItems = [
  {
    name: "Home",
    icon: "",
  },
  {
    name: "Settings",
    icon: "",
    items: ["Display", "Editor", "Theme", "Interface"],
  },
  {
    name: "Account",
    icon: "",
    items: ["Profile", "Security"],
  },
];

const Icon = ({ icon }: any) => {
  return <span>{icon}</span>;
};

const NavHeader = () => (
  <header className="sidebar-header">
    <button type="button">
      <Icon icon="menu" />
    </button>
    <span>Admin</span>
  </header>
);

const NavButton = ({ onClick, name, icon, isActive, hasSubNav }: any) => (
  <button
    type="button"
    onClick={() => onClick(name)}
    className={isActive ? "active" : ""}
  >
    {icon && <Icon icon={icon} />}
    <span>{name}</span>
    {hasSubNav && <Icon icon="+" />}
  </button>
);

const SubMenu = ({ item, activeItem, handleClick }: any) => {
  const navRef = useRef<HTMLDivElement>(null);
  const isSubNavOpen = (item: any, items: any) =>
    items.some((i: any) => i === activeItem) || item === activeItem;
  const { name, items } = item;

  return (
    <div
      className={`sub-nav ${isSubNavOpen(name, items) ? "open" : ""}`}
      style={{
        height: !isSubNavOpen(name, items) ? 0 : navRef.current?.clientHeight,
      }}
    >
      <div ref={navRef} className="sub-nav-inner">
        {item?.items.map((subItem: any) => (
          <NavButton
            onClick={handleClick}
            name={subItem}
            isActive={activeItem === subItem}
          />
        ))}
      </div>
    </div>
  );
};

export const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const handleclick = (item: string) => {
    setActiveItem(item !== activeItem ? item : "");
  };

  return (
    <aside className="sidebar">
      <NavHeader />
      {menuItems.map((item: any) => (
        <div>
          <NavButton
            onClick={handleclick}
            name={item.name}
            icon={item.icon}
            isActive={activeItem === item.name}
            hasSubNav={!!item.items}
          />
          {item.items && (
            <SubMenu
              activeItem={activeItem}
              handleClick={handleclick}
              item={item}
            />
          )}
        </div>
      ))}
    </aside>
  );
};
