import { ReactNode } from "react";

import {
  Anchor,
  Breadcrumbs,
  Container,
  ContainerProps,
  Space,
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
        <Breadcrumbs>
          {items.map((item) => (
            <Anchor key={item.label} href={item.href}>
              {item.label}
            </Anchor>
          ))}
        </Breadcrumbs>
      ) : null}

      <Title order={4}>{title}</Title>

      <Space h="lg" />

      {children}
    </Container>
  );
}