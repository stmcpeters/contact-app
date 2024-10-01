--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: contacts; Type: TABLE; Schema: public; Owner: beigeh0ney
--

CREATE TABLE public.contacts (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    phone_number character varying(20) NOT NULL,
    email character varying(255)
);


ALTER TABLE public.contacts OWNER TO beigeh0ney;

--
-- Name: contacts_id_seq; Type: SEQUENCE; Schema: public; Owner: beigeh0ney
--

CREATE SEQUENCE public.contacts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.contacts_id_seq OWNER TO beigeh0ney;

--
-- Name: contacts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beigeh0ney
--

ALTER SEQUENCE public.contacts_id_seq OWNED BY public.contacts.id;


--
-- Name: details; Type: TABLE; Schema: public; Owner: beigeh0ney
--

CREATE TABLE public.details (
    id integer NOT NULL,
    contact_id integer,
    birthday date NOT NULL
);


ALTER TABLE public.details OWNER TO beigeh0ney;

--
-- Name: details_id_seq; Type: SEQUENCE; Schema: public; Owner: beigeh0ney
--

CREATE SEQUENCE public.details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.details_id_seq OWNER TO beigeh0ney;

--
-- Name: details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: beigeh0ney
--

ALTER SEQUENCE public.details_id_seq OWNED BY public.details.id;


--
-- Name: contacts id; Type: DEFAULT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.contacts ALTER COLUMN id SET DEFAULT nextval('public.contacts_id_seq'::regclass);


--
-- Name: details id; Type: DEFAULT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.details ALTER COLUMN id SET DEFAULT nextval('public.details_id_seq'::regclass);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: beigeh0ney
--

COPY public.contacts (id, name, phone_number, email) FROM stdin;
1       steph   4151234567      steph@gmail.com
2       mike    4159876543      mike@gmail.com
3       jenn    4153792922      jenn@gmail.com
\.


--
-- Data for Name: details; Type: TABLE DATA; Schema: public; Owner: beigeh0ney
--

COPY public.details (id, contact_id, birthday) FROM stdin;
1       1       1998-09-30
2       2       1996-04-20
3       3       2001-09-11
\.


--
-- Name: contacts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beigeh0ney
--

SELECT pg_catalog.setval('public.contacts_id_seq', 3, true);


--
-- Name: details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: beigeh0ney
--

SELECT pg_catalog.setval('public.details_id_seq', 3, true);


--
-- Name: contacts contacts_pkey; Type: CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (id);


--
-- Name: details details_pkey; Type: CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT details_pkey PRIMARY KEY (id);


--
-- Name: details details_contact_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: beigeh0ney
--

ALTER TABLE ONLY public.details
    ADD CONSTRAINT details_contact_id_fkey FOREIGN KEY (contact_id) REFERENCES public.contacts(id);


--
-- PostgreSQL database dump complete
--

