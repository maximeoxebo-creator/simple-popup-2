import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  BlockStack,
} from "@shopify/polaris";

import { useState } from "react";

export default function Index() {
  const [title, setTitle] = useState("Bienvenue !");
  const [message, setMessage] = useState("Profitez de -10% aujourd'hui");

  return (
    <Page title="Simple Popup">
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <TextField
                label="Titre du popup"
                value={title}
                onChange={setTitle}
                autoComplete="off"
              />

              <TextField
                label="Message"
                value={message}
                onChange={setMessage}
                autoComplete="off"
                multiline={4}
              />

              <Button variant="primary">
                Sauvegarder
              </Button>
            </BlockStack>
          </Card>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <div
              style={{
                padding: "20px",
                textAlign: "center",
              }}
            >
              <h2>{title}</h2>
              <p>{message}</p>
            </div>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}