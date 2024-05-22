import { Title } from '@mantine/core';
import classes from './SideBar.module.css';
import { SideBarProps } from 'types';

const linksMockdata = [
  {
    id: 1,
    label: 'Users',
    link: '/admin/users'
  },
  {
    id: 2,
    label: 'Exams',
    link: '/admin/exams'
  }
];

export function SideBar({ activeLink }: SideBarProps) {
  const links = linksMockdata.map((item) => (
    <a
      className={classes.link}
      data-active={activeLink === item.label || undefined}
      href={item.link}
      key={item.id}>
      {item.label}
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.wrapper}>
        <div className={classes.main}>
          <Title order={4} className={classes.title}>
            Manager
          </Title>
          {links}
        </div>
      </div>
    </nav>
  );
}
