import { Flex, Heading, Link, Text, Box } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet';

const Personvern: React.FC = () => {
    const boldText = (text: string) => (
        <Box as="span" fontWeight="bold">
            {text}
        </Box>
    );
    const headingText = (text: string) => (
        <Text
            width="full"
            as="h5"
            fontWeight="normal"
            fontSize={{ base: '2xl', handheld: '4xl' }}
            marginBottom="4"
            marginTop="10"
        >
            {text}
        </Text>
    );

    return (
        <>
            <Helmet>
                <title>Personvernerklæring</title>
            </Helmet>
            <Flex
                as="main"
                direction="column"
                paddingY="5"
                paddingX="10"
                marginX="auto"
                width={{ base: 'full', tablet: '70%', xl: '50%' }}
                alignItems="flex-start"
            >
                <Heading
                    width="full"
                    as="h1"
                    fontWeight="normal"
                    fontSize={{ base: '2xl', handheld: '4xl' }}
                    paddingBottom="4"
                    borderBottom="1px solid"
                    borderBottomColor="gray.200"
                >
                    Personvernerklæring for Oslo kommune Renovasjons- og Gjenvinningsetatens Ombruksplattform.
                </Heading>

                {headingText('Hvilke opplysninger vi behandler')}

                <Text>
                    Informasjonen vi samler inn om deg avhenger av hvilken rolle du har i systemet og hvilket ansvar du
                    har for å kunne utføre arbeidet ditt. Personopplysninger som behandles i systemet legges inn i form
                    av kontaktinformasjon {boldText('for å kunne tilby varslingstjenester.')} Dette inkluderer{' '}
                    {boldText('navn, telefonnummer og e-post.')} For å kunne varsle om kommende hendelser, ekstra
                    hentinger, og lignende har vi behov for å lagre og behandle kontaktinformasjonen.
                </Text>

                <Text marginTop="4">
                    Informasjonen som er knyttet til deg som enkeltperson er kun tilgjengelig for brukere med rollen du
                    er knyttet til, som for eksempel stasjonen du jobber på eller partneren/firmaet du representerer, og
                    administratorene av systemet, som behøver tilgang for å kunne behandle personvernhenvendelser.
                </Text>

                <Text marginTop="4">
                    Det vil også behandles indirekte {boldText('lokaliseringsopplysninger')} for at kalenderen i
                    systemet skal kunne vise hvem som skal hente, hvor det skal hentes, og til hvilken tid. Dette
                    begrenser seg til at ved uttak av ombruksvarer vil det opprettes en «henting» i systemet som
                    inneholder hvilken stasjon hentingen gjelder for, hvilken partner (eller eventuell sjåfør) som skal
                    hente varene, og eventuelle merknader for hentingen.
                </Text>

                {headingText('Hvor lenge opplysningene blir lagret')}

                <Text>
                    Opplysningene om deg er lagret i systemet så lenge opplysningene er relevante for drift av systemet.
                    Ved utløp av avtaler med parter/firma skal REG slette opplysningene innen 7 dager etter utløp av
                    avtale. Ved avsluttet arbeidsforhold i REG skal REG slette opplysningene innen 7 dager etter utløp
                    av arbeidsavtale. Om du ønsker innsyn, retting eller sletting av din informasjon kan du finne
                    kontaktinformasjon på bunn av denne siden.
                </Text>

                {headingText('Hvem vi utleverer personopplysninger til')}

                <Text>
                    Informasjonen som er knyttet til deg som enkeltperson er kun tilgjengelig for brukere i systemet med
                    rollen du er knyttet til, som stasjonen du jobber på eller partneren du representerer, og
                    administratorene av systemet. Vi deler ikke din personinformasjon med tredjepart utenfor Oslo
                    Kommune Renovasjons- og gjenvinningsetaten.
                </Text>

                {headingText('Hva behandlingsgrunnlaget er for databehandlingen')}

                <Text>
                    Informasjonen vi behandler om deg som enkeltperson behandles på grunnlag av interesseavveiing. Det
                    betyr at det er nødvendig for å ivareta Renovasjons- og gjenvinningsetatens legitime interesser for
                    god håndtering av avtalene og et godt samarbeid med ombruksaktørene, for å sikre mest mulig ombruk.
                </Text>

                {headingText('Hvilke rettigheter du har')}

                <Text>
                    Du har rett til innsyn, retting, sletting, og begrensning av informasjonen vi behandler om deg. Du
                    har også rett til å protestere, automatiserte individuelle avgjørelser, dataportabilitet, og
                    informasjon. Du kan finne ut mer om dine rettigheter på Datatilsynet sine nettsider,
                    datatilsynet.no.
                </Text>

                {headingText('Spørsmål og henvendelser om behandling')}

                <Text marginBottom="4">
                    Har du spørsmål knyttet til personvern, kan du sende epost til:
                    <Link href="mailto:postmottak@reg.oslo.kommune.no"> postmottak@reg.oslo.kommune.no</Link>.
                </Text>

                <Text as="i" marginBottom="20">
                    Dersom du mener at vår behandling av personopplysninger ikke stemmer med personvernerklæring eller
                    at vi på andre måter bryter personvernlovgivningen, kan du også klage direkte til Datatilsynet.
                    Informasjon om hvordan du kan kontakte Datatilsynet finner du på Datatilsynets nettsider,{' '}
                    <Link href="https://www.datatilsynet.no" target="_blank">
                        datatilsynet.no.
                    </Link>
                </Text>
            </Flex>
        </>
    );
};

export default Personvern;
