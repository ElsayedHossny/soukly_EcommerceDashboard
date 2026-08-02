export interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

export interface AuthItem {
  login: {
    title: string;
    url: string;
  };
  signup: {
    title: string;
    url: string;
  };
}

export interface Navbar1Props {
  url: string;
  alt: string;
  title: string;
}
