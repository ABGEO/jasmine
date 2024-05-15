import { ReactNode } from "react";

import Link from "next/link";

import {
  Anchor,
  Breadcrumbs,
  Container,
  ContainerProps,
  Title,
} from "@mantine/core";

type PageContainerProps = {
  children: ReactNode;
  title: string;
  items?: { label: string; href: string }[];
} & Pick<ContainerProps, "fluid">;

export function PageContainer({
  children,
  title,
  items,
  fluid = true,
}: PageContainerProps) {
  return (
    <Container px={0} fluid={fluid}>
      {items && items.length > 0 ? (
        <Breadcrumbs mb="md">
          {items.map((item) => (
            <Anchor key={item.label} component={Link} href={item.href}>
              {item.label}
            </Anchor>
          ))}
        </Breadcrumbs>
      ) : null}

      <Title order={3} mb="md">
        {title}
      </Title>

      {children}
    </Container>
  );
}
