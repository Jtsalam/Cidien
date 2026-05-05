SET standard_conforming_strings = on;
SET client_encoding = 'UTF8';

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);

ALTER TABLE public._prisma_migrations ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);

CREATE TABLE public.bed_info (
    bed_id integer NOT NULL,
    room_id integer NOT NULL,
    bed_letter character varying(1) NOT NULL,
    is_available boolean DEFAULT true NOT NULL,
    is_assigned boolean DEFAULT false NOT NULL,
    assigned_patient_id integer,
    assigned_nurse_id integer
);

CREATE SEQUENCE public.bed_info_bed_id_seq START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public.bed_info_bed_id_seq OWNED BY public.bed_info.bed_id;
ALTER TABLE public.bed_info ALTER COLUMN bed_id SET DEFAULT nextval('public.bed_info_bed_id_seq');

CREATE TABLE public.medicalcenter_info (
    center_id integer NOT NULL,
    center_name text NOT NULL,
    address character varying(400),
    email character varying(400)
);

CREATE SEQUENCE public.medicalcenter_info_center_id_seq START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public.medicalcenter_info_center_id_seq OWNED BY public.medicalcenter_info.center_id;
ALTER TABLE public.medicalcenter_info ALTER COLUMN center_id SET DEFAULT nextval('public.medicalcenter_info_center_id_seq');

CREATE TABLE public.patient_info (
    patient_id integer NOT NULL,
    patient_name text NOT NULL,
    registered_date date NOT NULL,
    center_id integer NOT NULL,
    dicharged_date date,
    is_discharged boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE public.patient_info_patient_id_seq START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public.patient_info_patient_id_seq OWNED BY public.patient_info.patient_id;
ALTER TABLE public.patient_info ALTER COLUMN patient_id SET DEFAULT nextval('public.patient_info_patient_id_seq');

CREATE TABLE public.patient_uploads (
    patient_id integer NOT NULL,
    session_id integer NOT NULL,
    upload_path text NOT NULL,
    patient_notes text NOT NULL,
    upload_time time without time zone NOT NULL
);

CREATE TABLE public.room_data (
    id integer NOT NULL,
    bed_id integer NOT NULL,
    audio_path character varying(400) NOT NULL,
    patient_note character varying(400) NOT NULL,
    is_approved integer DEFAULT 0 NOT NULL,
    pdf_path character varying(400)
);

CREATE SEQUENCE public.room_data_id_seq START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public.room_data_id_seq OWNED BY public.room_data.id;
ALTER TABLE public.room_data ALTER COLUMN id SET DEFAULT nextval('public.room_data_id_seq');

CREATE TABLE public.room_info (
    room_id integer NOT NULL,
    room_number integer NOT NULL,
    center_id integer NOT NULL,
    number_of_beds integer NOT NULL,
    is_full boolean DEFAULT false NOT NULL
);

CREATE SEQUENCE public.room_info_room_id_seq START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public.room_info_room_id_seq OWNED BY public.room_info.room_id;
ALTER TABLE public.room_info ALTER COLUMN room_id SET DEFAULT nextval('public.room_info_room_id_seq');

CREATE TABLE public.room_register (
    room_id integer NOT NULL,
    patient_id integer NOT NULL,
    session_id integer NOT NULL,
    center_id integer NOT NULL,
    reg_date date NOT NULL,
    reg_time time without time zone NOT NULL
);

CREATE TABLE public.user_info (
    user_id integer NOT NULL,
    user_name text NOT NULL,
    staff_id text NOT NULL,
    password character varying(255) NOT NULL,
    user_role text NOT NULL,
    center_id integer NOT NULL,
    charter_id text NOT NULL
);

CREATE SEQUENCE public.user_info_user_id_seq START WITH 1 INCREMENT BY 1;
ALTER SEQUENCE public.user_info_user_id_seq OWNED BY public.user_info.user_id;
ALTER TABLE public.user_info ALTER COLUMN user_id SET DEFAULT nextval('public.user_info_user_id_seq');

CREATE TABLE public.user_uploads (
    user_id integer NOT NULL,
    center_id integer NOT NULL,
    upload_path text NOT NULL,
    unassigned_uploads text NOT NULL,
    upload_date date NOT NULL,
    upload_time time without time zone NOT NULL
);

ALTER TABLE public.bed_info ADD CONSTRAINT bed_info_pkey PRIMARY KEY (bed_id);
ALTER TABLE public.medicalcenter_info ADD CONSTRAINT medicalcenter_info_pkey PRIMARY KEY (center_id);
ALTER TABLE public.patient_info ADD CONSTRAINT patient_info_pkey PRIMARY KEY (patient_id);
ALTER TABLE public.patient_uploads ADD CONSTRAINT patient_uploads_pkey PRIMARY KEY (patient_id, session_id);
ALTER TABLE public.room_data ADD CONSTRAINT room_data_pkey PRIMARY KEY (id);
ALTER TABLE public.room_info ADD CONSTRAINT room_info_pkey PRIMARY KEY (room_id);
ALTER TABLE public.room_register ADD CONSTRAINT room_register_pkey PRIMARY KEY (room_id, patient_id, session_id);
ALTER TABLE public.user_info ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_id);
ALTER TABLE public.user_uploads ADD CONSTRAINT user_uploads_pkey PRIMARY KEY (user_id, center_id);

ALTER TABLE public.bed_info ADD CONSTRAINT bed_info_assigned_nurse_id_fkey FOREIGN KEY (assigned_nurse_id) REFERENCES public.user_info(user_id);
ALTER TABLE public.bed_info ADD CONSTRAINT bed_info_assigned_patient_id_fkey FOREIGN KEY (assigned_patient_id) REFERENCES public.patient_info(patient_id);
ALTER TABLE public.bed_info ADD CONSTRAINT bed_info_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room_info(room_id);

ALTER TABLE public.patient_info ADD CONSTRAINT patient_info_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);

ALTER TABLE public.patient_uploads ADD CONSTRAINT patient_uploads_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient_info(patient_id);

ALTER TABLE public.room_data ADD CONSTRAINT room_data_bed_id_fkey FOREIGN KEY (bed_id) REFERENCES public.bed_info(bed_id);

ALTER TABLE public.room_info ADD CONSTRAINT room_info_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);

ALTER TABLE public.room_register ADD CONSTRAINT room_register_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);
ALTER TABLE public.room_register ADD CONSTRAINT room_register_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient_info(patient_id);
ALTER TABLE public.room_register ADD CONSTRAINT room_register_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room_info(room_id);

ALTER TABLE public.user_info ADD CONSTRAINT user_info_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);

ALTER TABLE public.user_uploads ADD CONSTRAINT user_uploads_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);
ALTER TABLE public.user_uploads ADD CONSTRAINT user_uploads_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(user_id);

COPY public.bed_info (bed_id, room_id, bed_letter, is_available, is_assigned, assigned_patient_id, assigned_nurse_id) FROM stdin;
35	13	C	t	f	\N	\N
41	16	A	t	f	\N	\N
34	13	B	f	t	32	1
36	14	A	f	t	35	1
1	1	A	t	f	\N	\N
2	1	B	t	f	\N	\N
3	1	C	t	f	\N	\N
4	2	A	t	f	\N	\N
5	2	B	t	f	\N	\N
6	2	C	t	f	\N	\N
7	3	A	t	f	\N	\N
8	4	A	t	f	\N	\N
9	4	B	t	f	\N	\N
10	4	C	t	f	\N	\N
11	5	A	t	f	\N	\N
12	5	B	t	f	\N	\N
13	5	C	t	f	\N	\N
14	5	D	t	f	\N	\N
15	6	A	t	f	\N	\N
16	6	B	t	f	\N	\N
17	7	A	t	f	\N	\N
18	7	B	t	f	\N	\N
19	7	C	t	f	\N	\N
20	8	A	t	f	\N	\N
21	8	B	t	f	\N	\N
22	8	C	t	f	\N	\N
23	9	A	t	f	\N	\N
24	9	B	t	f	\N	\N
25	10	A	t	f	\N	\N
26	10	B	t	f	\N	\N
27	10	C	t	f	\N	\N
28	10	D	t	f	\N	\N
29	11	A	t	f	\N	\N
30	11	B	t	f	\N	\N
31	11	C	t	f	\N	\N
32	12	A	t	f	\N	\N
39	15	A	t	f	\N	\N
40	15	B	t	f	\N	\N
37	14	B	t	f	\N	\N
38	14	C	t	f	\N	\N
33	13	A	t	f	\N	\N
\.



--
-- TOC entry 4928 (class 0 OID 16390)
-- Dependencies: 218
-- Data for Name: medicalcenter_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.medicalcenter_info (center_id, center_name, address, email) FROM stdin;
1	Northcrest Medical Center	null	null
2	Starlane General Hospital	null	null
3	Evergreen Health Institute	null	null
4	NovaCare Institute	null	null
5	Havenridge General Hospital	null	null
\.


--
-- TOC entry 4930 (class 0 OID 16399)
-- Dependencies: 220
-- Data for Name: patient_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patient_info (patient_id, patient_name, registered_date, center_id, dicharged_date, is_discharged) FROM stdin;
27	John Cena	2025-08-09	4	2025-08-25	t
28	CVM	2025-08-09	4	2025-08-25	t
29	kdkjn	2025-08-25	4	2025-08-25	t
31	John coltrane	2025-08-25	4	2025-08-25	t
30	Adelabu Johnson	2025-08-25	4	2025-08-25	t
32	DVM	2025-08-25	4	\N	f
34	Yul edochie	2025-08-27	4	2025-11-15	t
33	FGM	2025-08-25	4	2025-11-15	t
35	lo	2025-11-15	4	\N	f
\.


--
-- TOC entry 4931 (class 0 OID 16412)
-- Dependencies: 221
-- Data for Name: patient_uploads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.patient_uploads (patient_id, session_id, upload_path, patient_notes, upload_time) FROM stdin;
\.


--
-- TOC entry 4941 (class 0 OID 16673)
-- Dependencies: 231
-- Data for Name: room_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_data (id, bed_id, audio_path, patient_note, is_approved, pdf_path) FROM stdin;
103	36	c:\\xampp\\htdocs\\Cidien\\Charting-Device\\uploads\\Audio\\NCI\\room.recording_b380fd473e6c48b79b8b028b636de9a0.webm	recording room for bed A	1	c:\\xampp\\htdocs\\Cidien\\Charting-Device\\uploads\\PDFs\\NCI\\chart_2001745_20251126_165329_Room2178_BedA.pdf
\.


--
-- TOC entry 4933 (class 0 OID 16425)
-- Dependencies: 223
-- Data for Name: room_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_info (room_id, room_number, center_id, number_of_beds, is_full) FROM stdin;
1	3438	1	3	f
2	3439	1	3	f
3	3461	2	1	f
4	2438	2	3	f
5	3345	3	4	f
6	1098	3	2	f
7	2137	3	3	f
8	1760	1	3	f
9	3531	3	2	f
10	2437	1	4	f
11	3375	2	3	f
12	2175	2	1	f
15	3452	4	2	f
13	3247	4	3	f
16	789	4	1	f
14	2178	4	3	f
\.


--
-- TOC entry 4934 (class 0 OID 16436)
-- Dependencies: 224
-- Data for Name: room_register; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.room_register (room_id, patient_id, session_id, center_id, reg_date, reg_time) FROM stdin;
\.


--
-- TOC entry 4936 (class 0 OID 16457)
-- Dependencies: 226
-- Data for Name: user_info; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_info (user_id, user_name, staff_id, password, user_role, center_id, charter_id) FROM stdin;
1	Ifejesu Salam	2001745	$2y$10$8Gat9PJiUPErXwZlLULDkOo7ZXPvs6mFlCSFJLtzeBKJH9eljNF62	Staff	4	7382BF16
2	Thomas Vernon	4101735	$2y$10$KufW4NMvqBUo9Ibnr4RsieTdbeR9t6tZCkRzxbM9LEQd013zlBOr6	Admin	4	9465CK92
3	Jessica nia	1285723	$2y$10$pg9N05LBhpbSzVXFSG514.44FcAIiz/v6hszIIZngKrAUKD8QJ2uW	Admin	5	2759DL34
4	Adrea James	1095422	$2y$10$l4Jf0zNFjblP0WobdTY/DOcPpRtJ3eev2Zub0kTXXOrs687XB8zLO	Staff	5	5098EG57
5	Tom Murphy	2378651	$2y$10$Jk4Go/zURHydLuvCljlfB.EE2wVrwR6/uSkM5kl4F1aOR2c7e4w.K	Staff	1	8632FH83
6	Robert Blue	3127901	$2y$10$.KEfuv4J.fQo1EtFS36D1OtpzsWOHOlTVypZhUWqTMlLbAwS9hipW	Admin	1	1743GI29
7	Sarah Love	4712902	$2y$10$WsBCo5RlMB53cgkOPwjbGuIsKkeV6yfVfxx2Ka01q6SN.jFu0rvVi	Admin	2	6824HJ45
8	Mary Andrews	3701291	$2y$10$r7fnDfKKw1VzVjxNpIOekOcl4LNxn8TkIK71cD0lDkgbhT9Tbu3W2	Staff	2	2956ZB43
9	John Adams	4720943	$2y$10$SzW3IctNwEaZdEHLeaRMhe25g9XsD.cMq/TEvZGdOYsvrNf18365O	Admin	3	8412MN90
10	Layla Tomkins	8462192	$2y$10$iLk3WFAvlPzTUw1o066/UOwmdRbzyXwRqyVRTDiNH5plTJRynR6am	Staff	3	5731QX18
\.


--
-- TOC entry 4937 (class 0 OID 16470)
-- Dependencies: 227
-- Data for Name: user_uploads; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_uploads (user_id, center_id, upload_path, unassigned_uploads, upload_date, upload_time) FROM stdin;
\.


--
-- TOC entry 4954 (class 0 OID 0)
-- Dependencies: 228
-- Name: bed_info_bed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bed_info_bed_id_seq', 41, true);


--
-- TOC entry 4955 (class 0 OID 0)
-- Dependencies: 217
-- Name: medicalcenter_info_center_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.medicalcenter_info_center_id_seq', 10, true);


--
-- TOC entry 4956 (class 0 OID 0)
-- Dependencies: 219
-- Name: patient_info_patient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.patient_info_patient_id_seq', 35, true);


--
-- TOC entry 4957 (class 0 OID 0)
-- Dependencies: 230
-- Name: room_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_data_id_seq', 103, true);


--
-- TOC entry 4958 (class 0 OID 0)
-- Dependencies: 222
-- Name: room_info_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_info_room_id_seq', 16, true);


--
-- TOC entry 4959 (class 0 OID 0)
-- Dependencies: 225
-- Name: user_info_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_info_user_id_seq', 13, true);


--
-- TOC entry 4768 (class 2606 OID 16709)
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 4764 (class 2606 OID 16525)
-- Name: bed_info bed_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed_info
    ADD CONSTRAINT bed_info_pkey PRIMARY KEY (bed_id);


--
-- TOC entry 4750 (class 2606 OID 16397)
-- Name: medicalcenter_info medicalcenter_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.medicalcenter_info
    ADD CONSTRAINT medicalcenter_info_pkey PRIMARY KEY (center_id);


--
-- TOC entry 4752 (class 2606 OID 16406)
-- Name: patient_info patient_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_info
    ADD CONSTRAINT patient_info_pkey PRIMARY KEY (patient_id);


--
-- TOC entry 4754 (class 2606 OID 16418)
-- Name: patient_uploads patient_uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_uploads
    ADD CONSTRAINT patient_uploads_pkey PRIMARY KEY (patient_id, session_id);


--
-- TOC entry 4766 (class 2606 OID 16678)
-- Name: room_data room_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_data
    ADD CONSTRAINT room_data_pkey PRIMARY KEY (id);


--
-- TOC entry 4756 (class 2606 OID 16430)
-- Name: room_info room_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_info
    ADD CONSTRAINT room_info_pkey PRIMARY KEY (room_id);


--
-- TOC entry 4758 (class 2606 OID 16440)
-- Name: room_register room_register_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_register
    ADD CONSTRAINT room_register_pkey PRIMARY KEY (room_id, patient_id, session_id);


--
-- TOC entry 4760 (class 2606 OID 16464)
-- Name: user_info user_info_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_pkey PRIMARY KEY (user_id);


--
-- TOC entry 4762 (class 2606 OID 16476)
-- Name: user_uploads user_uploads_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_uploads
    ADD CONSTRAINT user_uploads_pkey PRIMARY KEY (user_id, center_id);


--
-- TOC entry 4778 (class 2606 OID 16526)
-- Name: bed_info bed_info_assigned_nurse_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed_info
    ADD CONSTRAINT bed_info_assigned_nurse_id_fkey FOREIGN KEY (assigned_nurse_id) REFERENCES public.user_info(user_id);


--
-- TOC entry 4779 (class 2606 OID 16531)
-- Name: bed_info bed_info_assigned_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed_info
    ADD CONSTRAINT bed_info_assigned_patient_id_fkey FOREIGN KEY (assigned_patient_id) REFERENCES public.patient_info(patient_id);


--
-- TOC entry 4780 (class 2606 OID 16541)
-- Name: bed_info bed_info_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bed_info
    ADD CONSTRAINT bed_info_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room_info(room_id);


--
-- TOC entry 4769 (class 2606 OID 16407)
-- Name: patient_info patient_info_center_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_info
    ADD CONSTRAINT patient_info_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);


--
-- TOC entry 4770 (class 2606 OID 16419)
-- Name: patient_uploads patient_uploads_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.patient_uploads
    ADD CONSTRAINT patient_uploads_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient_info(patient_id);


--
-- TOC entry 4781 (class 2606 OID 16679)
-- Name: room_data room_data_bed_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_data
    ADD CONSTRAINT room_data_bed_id_fkey FOREIGN KEY (bed_id) REFERENCES public.bed_info(bed_id);


--
-- TOC entry 4771 (class 2606 OID 16431)
-- Name: room_info room_info_center_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_info
    ADD CONSTRAINT room_info_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);


--
-- TOC entry 4772 (class 2606 OID 16451)
-- Name: room_register room_register_center_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_register
    ADD CONSTRAINT room_register_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);


--
-- TOC entry 4773 (class 2606 OID 16446)
-- Name: room_register room_register_patient_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_register
    ADD CONSTRAINT room_register_patient_id_fkey FOREIGN KEY (patient_id) REFERENCES public.patient_info(patient_id);


--
-- TOC entry 4774 (class 2606 OID 16441)
-- Name: room_register room_register_room_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.room_register
    ADD CONSTRAINT room_register_room_id_fkey FOREIGN KEY (room_id) REFERENCES public.room_info(room_id);


--
-- TOC entry 4775 (class 2606 OID 16465)
-- Name: user_info user_info_center_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_info
    ADD CONSTRAINT user_info_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);


--
-- TOC entry 4776 (class 2606 OID 16482)
-- Name: user_uploads user_uploads_center_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_uploads
    ADD CONSTRAINT user_uploads_center_id_fkey FOREIGN KEY (center_id) REFERENCES public.medicalcenter_info(center_id);


--
-- TOC entry 4777 (class 2606 OID 16477)
-- Name: user_uploads user_uploads_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_uploads
    ADD CONSTRAINT user_uploads_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.user_info(user_id);


-- Completed on 2025-11-30 15:22:52

--
-- PostgreSQL database dump complete
--

