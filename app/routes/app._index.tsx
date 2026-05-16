import { authenticate } from "../shopify.server";
import {
  Page,
  Layout,
  Card,
  TextField,
  Button,
  BlockStack,
  Text,
} from "@shopify/polaris";
import { useState } from "react";
import { useLoaderData } from "react-router"; // ✅ react-router, PAS @remix-run/react
import { json } from "@remix-run/node";

export const loader = async ({ request }: { request: Request }) => {
  const { session } = await authenticate.admin(request);

  // ⚠️ Billing API désactivée en dev (app non publique)
  // À réactiver une fois l'app soumise sur l'App Store :
  //
  // const { billing } = await authenticate.admin(request);
  // await billing.require({
  //   plans: ["ProPlan"],
  //   isTest: true,
  //   onFailure: () => billing.request({ plan: "ProPlan", isTest: true }),
  // });

  return json({ shop: session.shop });
};

export default function Index() {
  const { shop } = useLoaderData<typeof loader>();

  const [title, setTitle] = useState("Bienvenue !");
  const [message, setMessage] = useState("Profitez de -10% aujourd'hui");

  const handleSave = () => {
    // TODO: connecter à une action Remix pour persister en DB/métafields
    console.log("Sauvegarde pour", shop, { title, message });
  };

  return (
    <Page title="Simple Popup">
      <Layout>
        {/* CONFIG POPUP */}
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <Text as="h2" variant="headingMd">
                Configuration
              </Text>

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

              <Button variant="primary" onClick={handleSave}>
                Sauvegarder
              </Button>
            </BlockStack>
          </Card>
        </Layout.Section>

        {/* PREVIEW */}
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h3" variant="headingSm">
                Aperçu
              </Text>
              <div
                style={{
                  padding: "20px",
                  textAlign: "center",
                  border: "1px solid #e1e3e5",
                  borderRadius: "8px",
                  background: "#fff",
                }}
              >
                <Text as="h2" variant="headingLg">
                  {title}
                </Text>
                <Text as="p" variant="bodyMd">
                  {message}
                </Text>
              </div>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}