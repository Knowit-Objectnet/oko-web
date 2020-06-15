import org.jetbrains.kotlin.gradle.dsl.Coroutines
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

val logback_version: String by project
val ktor_version: String by project
val kotlin_version: String by project


group "oslokommune.ombruk"
version "0.0.1"

plugins {

    application
    kotlin("jvm") version "1.3.70"
    id("com.github.johnrengelman.shadow") version "5.0.0"
}

application {
    mainClassName = "io.ktor.server.netty.EngineMain"
}

repositories {
    mavenLocal()
    jcenter()
}

dependencies {

    fun ktor(module: String) = "io.ktor:ktor-$module:$ktor_version"

    implementation(kotlin("stdlib-jdk8"))
    implementation(ktor("server-netty"))
    implementation(ktor("server-core"))
    implementation(ktor("locations"))
    implementation(ktor("metrics"))
    implementation(ktor("server-sessions"))
    implementation(ktor("server-host-common"))
    implementation(ktor("gson"))
    implementation("ch.qos.logback:logback-classic:$logback_version")
    testImplementation (ktor("server-tests"))
}

kotlin.sourceSets["main"].kotlin.srcDirs("src")
kotlin.sourceSets["test"].kotlin.srcDirs("test")

sourceSets["main"].resources.srcDirs("resources")
sourceSets["test"].resources.srcDirs("testresources")

tasks.withType<Jar> {
    manifest {
        attributes(
            mapOf(
                "Main-Class" to application.mainClassName
            )
        )
    }
}
